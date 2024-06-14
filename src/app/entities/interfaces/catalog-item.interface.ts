/**
 * Интерфейс элемента каталога
 *
 * @property {string} name - наименование товара
 * @property {number} price - стоимость товара
 * @property {number} discount - размер скидки
 * @property {category} category - наименование категории
 */
export interface CatalogItem {
  name: string;
  price: number;
  discount?: number;
  category: string;
}
