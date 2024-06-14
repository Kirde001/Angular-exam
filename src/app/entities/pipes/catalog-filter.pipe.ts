import { Pipe, PipeTransform } from '@angular/core';
import {CatalogItem} from "../interfaces/catalog-item.interface";

@Pipe({
  name: 'CatalogFilter'
})
export class CatalogFilterPipe implements PipeTransform {
  transform(items: CatalogItem[], value: any): any[] {
    if (value.name) {
      // @ts-ignore
      items = items.filter((item: CatalogItem): CatalogItem => {
        if (item.name.toLowerCase().includes(value.name.toLowerCase())) {
          return item;
        }
      });
    }

    if (value.category !== '' && value.category.toLowerCase() !== 'все') {
      // @ts-ignore
      items = items.filter((item: CatalogItem): CatalogItem => {
        if (item.category.toLowerCase().includes(value.category.toLowerCase())) {
          return item;
        }
      });
    } else if (!value.category || value.category.toLowerCase() === 'все') {
      return items;
    }

    if (value.minPrice) {
      // @ts-ignore
      items = items.filter((item: CatalogItem): CatalogItem => {
        if (item.price >= value.minPrice) {
          return item;
        }
      })
    }

    if (value.maxPrice) {
      // @ts-ignore
      items = items.filter((item: CatalogItem): CatalogItem => {
        if (item.price <= value.maxPrice) {
          return item;
        }
      })
    }

    return items.map((item: CatalogItem): CatalogItem => {
      return {
        ...item,
        name: item.name.split("").reverse().join("")
      }
    });
  }

}
