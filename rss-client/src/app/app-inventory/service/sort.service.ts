import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { Product } from '../class/product/product';
import { DecimalPipe } from '@angular/common';
import { tap, debounceTime, switchMap, delay } from "rxjs/operators";
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { InventoryService } from './inventory.service';

interface SearchResult {
	products: Product[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(products: Product[], column: SortColumn, direction: string): Product[] {
	if (direction === '' || column === '') {
		return products;
	} else {
		return [...products].sort((a, b) => {
			const res = compare(`${a[column]}`, `${b[column]}`);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(product: Product, term: string, pipe: PipeTransform) {
	return product.name.toLowerCase().includes(term.toLowerCase())
		|| pipe.transform(product.id).includes(term)
		|| product.brand.toLowerCase().includes(term.toLowerCase())
		|| product.category.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
	providedIn: 'root'
})
export class SortService {

	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _products$ = new BehaviorSubject<Product[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	// inventory = new BehaviorSubject<Product[]>([]);
	inventoryList: Product[];

	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: ''
	};

	constructor(private pipe: DecimalPipe, private inventorySrvc: InventoryService) {
		this.initSearch();
	}

	initSearch() {
		this._search$.pipe(
			tap(() => this._loading$.next(true)),
			debounceTime(200),
			switchMap(() => this._search()),
			delay(200),
			tap(() => this._loading$.next(false))
		).subscribe(result => {
			this._products$.next(result.products);
			this._total$.next(result.total);
		});

		this._search$.next();
	}

	get products$() { return this._products$.asObservable(); }
	get total$() { return this._total$.asObservable(); }
	get loading$() { return this._loading$.asObservable(); }
	get page() { return this._state.page; }
	get pageSize() { return this._state.pageSize; }
	get searchTerm() { return this._state.searchTerm; }

	set page(page: number) { this._set({ page }); }
	set pageSize(pageSize: number) { this._set({ pageSize }); }
	set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
	set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
	set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	setInventory(inventory: Product[]) {
		this.inventoryList = inventory;
		this.initSearch();
	}

	private _search(): Observable<SearchResult> {

		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let products = sort(this.inventoryList, sortColumn, sortDirection);

		// 2. filter
		products = products.filter(product => matches(product, searchTerm, this.pipe));
		const total = products.length;

		// 3. paginate
		products = products.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ products, total });
	}

}
