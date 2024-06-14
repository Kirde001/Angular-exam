import {Component, Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AppService} from '../../services/app.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CatalogCategoryDialogComponent} from "../catalog-category-dialog/catalog-category-dialog.component";
import {CatalogItemDialogComponent} from "../catalog-item-dialog/catalog-item-dialog.component";
import {CatalogItem} from "../../interfaces/catalog-item.interface";
import {CatalogCategory} from "../../interfaces/catalog-category.interface";

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public catalogCategoriesDisplayedColumns: string[] = ['name', 'actions'];
  public catalogCategoriesDataSource: MatTableDataSource<CatalogCategory> = new MatTableDataSource([...this._appService.catalogCategories.filter((catalogCategory: CatalogCategory): boolean => catalogCategory.name.toLowerCase() !== 'все')]);

  public catalogItemsDisplayedColumns: string[] = ['name', 'price', 'category', 'discount', 'actions'];
  public catalogItemsDataSource: MatTableDataSource<CatalogItem> = new MatTableDataSource([...this._appService.catalogItems
    .map((item: CatalogItem, index: number, array: CatalogItem[]): CatalogItem => {
      return {
        ...item,
        category: array[array.length - index - 1] ? array[array.length - index - 1].category : item.category
      }
    })
  ]);

  constructor(
    public dialog: MatDialog,
    private readonly _appService: AppService
  ) {
  }

  /**
   * Метод открытия диалога категории
   *
   * @param {number} categoryIndex - индекс товара
   */
  public showCatalogCategoryDialog(categoryIndex?: number): void {
    let catalogCategory: CatalogCategory | null = null;

    if (typeof categoryIndex !== 'undefined') {
      catalogCategory = [...this._appService.catalogCategories][Number(categoryIndex)];
    }

    let dialogRef: MatDialogRef<CatalogCategoryDialogComponent> = this.dialog.open(CatalogCategoryDialogComponent, {
      data: catalogCategory ? { ...catalogCategory } : null,
      disableClose: !!catalogCategory
    });

    dialogRef.afterClosed().subscribe((dialogData: CatalogCategory): void => {
      if (dialogData) {
        if (catalogCategory) {
          this._appService.catalogCategories[Number(categoryIndex)] = dialogData;
          this.catalogCategoriesDataSource.data[Number(categoryIndex)] = dialogData;
        } else {
          this._appService.createCatalogCategory(dialogData);
          this.catalogCategoriesDataSource.data.push(dialogData);
        }
        this.catalogCategoriesDataSource._updateChangeSubscription();
      }
    });
  }

  /**
   * Метод открытия диалога элемента
   *
   * @param {number | undefined} itemIndex - индекс товара
   */
  public showCatalogItemDialog(itemIndex?: number): void {
    let catalogItem: CatalogItem | null = null;

    if (typeof itemIndex !== 'undefined') {
      catalogItem = [...this._appService.catalogItems][Number(itemIndex)];
    }

    let dialogRef: MatDialogRef<CatalogItemDialogComponent> = this.dialog.open(CatalogItemDialogComponent, {
      data: catalogItem ? { ...catalogItem } : null,
      disableClose: !!catalogItem
    });

    dialogRef.afterClosed().subscribe((dialogData: CatalogItem): void => {
      if (dialogData) {
        if (catalogItem) {
          this._appService.catalogItems[Number(itemIndex)] = dialogData;
          this.catalogItemsDataSource.data[Number(itemIndex)] = dialogData;
        } else {
          this._appService.createCatalogItem(dialogData);
          this.catalogItemsDataSource.data.push(dialogData);
        }
        this.catalogItemsDataSource._updateChangeSubscription();
      }
    });
  }

  /**
   * Удаление товара
   *
   * @param {number} rowIndex - индекс товара
   */
  public deleteCatalogItem(rowIndex: number | number[]): void {
    if (typeof rowIndex === 'number') {
      this.catalogItemsDataSource.data.splice(rowIndex, 1);
    } else if (Array.isArray(rowIndex)) {
      const updatedCatalogItems: CatalogItem[] = [...this._appService.catalogItems]
        .filter((item: CatalogItem, index: number) => !(rowIndex as number[]).includes(index));
      this.catalogItemsDataSource = new MatTableDataSource<CatalogItem>(updatedCatalogItems);
    }

    this.catalogItemsDataSource._updateChangeSubscription();
    this._appService.deleteCatalogItem(rowIndex as number);
  }

  /**
   * Удаление категории
   * При удалении категории так же удаляются все товары, которые принадлежат данной категории
   *
   * @param {number} rowIndex - индекс категории
   */
  public deleteCatalogCategory(rowIndex: number): void {
    const catalogCategory: CatalogCategory = this._appService.catalogCategories[Number(rowIndex)];
    const itemsIndexesToDelete: number[] = [];

    this._appService.catalogItems.forEach((catalogItem: CatalogItem, itemIndex: number): void => {
      if (catalogItem.category === catalogCategory.name) {
        itemsIndexesToDelete.push(itemIndex);
      }
    });

    // Передаем в метод удаления товаров массив индексов товаров, принадлежащих категории
    this.deleteCatalogItem(itemsIndexesToDelete);

    // Удаляем категорию и обновляем таблицу с категориями
    this.catalogCategoriesDataSource.data.splice(rowIndex, 1);
    this.catalogCategoriesDataSource._updateChangeSubscription();
    this._appService.deleteCatalogCategory(rowIndex);
  }
}
