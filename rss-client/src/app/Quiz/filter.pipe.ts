import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], prop: string, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return it[prop].toLowerCase().includes(searchText);
    });
  }
}
