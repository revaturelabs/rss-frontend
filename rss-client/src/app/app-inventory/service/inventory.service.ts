import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class InventoryService {

	baseUrl = `${environment.inventoryServiceUrl}/`;

	constructor(private http: HttpClient) { }

	// CREATE
	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(this.baseUrl + "product", product); // http://localhost:8989/product
	}

	// READ
	getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.baseUrl + "product"); // http://localhost:8989/product
	}

	getProductById(id: number): Observable<Product> {
		return this.http.get<Product>(this.baseUrl + "product/" + id); // http://localhost:8989/product/{id}
	}

	// UPDATE
	public updateProduct(product: Product) {
		return this.http.put<Product>(this.baseUrl + "product", product); // http://localhost:8989/product
	}

	// DELETE
	deleteProductById(id: number): Observable<Product> {
		return this.http.delete<Product>(this.baseUrl + "product/" + id); // http://localhost:8989/product/{id}
	}

}
