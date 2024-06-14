import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CatalogItem} from "../interfaces/catalog-item.interface";
import {CatalogCategory} from "../interfaces/catalog-category.interface";

@Injectable({
  providedIn: 'root',
})

export class AppService {
  constructor(
    private readonly _fb: FormBuilder,
  ) {
  }

  public catalogCategories: CatalogCategory[] = [
    {id: 1, name: 'Телевизоры'},
    {id: 2, name: 'Музыкальные центры'},
    {id: 3, name: 'Игровые приставки'},
    {id: 4, name: 'Кофемашины'},
    {id: 5, name: 'Пылесосы'},
    {id: 10000, name: 'Все'},
  ];

  public catalogItems: any[] = [
    {name: 'Телевизор Philips mod. 123', price: 32000, category: 'Телевизоры', discount: 15},
    {name: 'Музыкальный центр Aiwa', price: 12650, category: 'Музыкальные центры', discount: 25},
    {name: 'Sony PlayStation 5 Pro', price: 56700, category: 'Игровые приставки', discount: 5},
    {name: 'Кофемашина DeLonghi (черная)', price: 24710, category: 'Кофемашины', discount: 20},
    {name: 'Робот-пылесос Xiaomi', price: 18040, category: 'Пылесосы', discount: 0},
    {name: 'Пылесос Циклон (СССР)', price: 3330, category: 'Пылесосы', discount: 20},
  ];

  /**
   * Функция создания формгруппы для поиска
   *
   * @return {FormGroup}
   */
  public catalogFilterStateForm(): FormGroup {
    return this._fb.group({
      name: new FormControl(),
      category: new FormControl(''),
      minPrice: new FormControl(0,[Validators.min(0), Validators.max(100000)]),
      maxPrice: new FormControl(1000000,[Validators.min(0), Validators.max(100000)]),
      sortType: new FormControl(1),
    })
  };

  /**
   * Функция создания формгруппы для добавления товара
   *
   * @return {FormGroup}
   */
  public catalogItemForm(): FormGroup {
    return this._fb.group({
      name: new FormControl('', [Validators.pattern(/[a-zA-Zа-яёА-ЯЁ]/), Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.pattern(/[0-9]/), Validators.required]),
      discount: new FormControl('', [Validators.pattern(/[0-9]/), Validators.required]),
    })
  }

  /**
   * Функция создания формгруппы для добавления категории
   *
   * @return {FormGroup}
   */
  public catalogCategoryForm(): FormGroup {
    return this._fb.group({
      name: new FormControl('', [Validators.pattern(/[a-zA-Zа-яёА-ЯЁ]/), Validators.required]),
    })
  }

  /**
   * Добавление категории
   *
   * @param {CatalogItem} item - данные о товаре
   */
  public createCatalogCategory(item: CatalogCategory): void {
    this.catalogCategories.push(item);
  }

  /**
   * Удаление категории
   *
   * @param {number} rowIndex - индекс в массиве
   */
  public deleteCatalogCategory(rowIndex: number): void {
    this.catalogCategories.splice(rowIndex, 1);
  }

  /**
   * Добавление товара
   *
   * @param {CatalogItem} item - данные о товаре
   */
  public createCatalogItem(item: CatalogItem): void {
    this.catalogItems.push(item);
  }

  /**
   * Удаление товара
   *
   * @param {number} rowIndex - индекс в массиве
   */
  public deleteCatalogItem(rowIndex: number): void {
    this.catalogItems.splice(rowIndex, 1);
  }

}
