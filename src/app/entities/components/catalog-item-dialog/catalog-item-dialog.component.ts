import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {CatalogCategory} from "../../interfaces/catalog-category.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CatalogItem} from "../../interfaces/catalog-item.interface";

@Component({
  selector: 'app-catalog-item-dialog',
  templateUrl: './catalog-item-dialog.component.html',
  styleUrls: ['./catalog-item-dialog.component.scss']
})
export class CatalogItemDialogComponent implements OnInit {
  public catalogItemForm: FormGroup;
  public catalogCategories: CatalogCategory[] = [];

  constructor(
    public dialogRef: MatDialogRef<CatalogItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CatalogItem,
    private readonly _appService: AppService
  ) {
    this.catalogCategories = this._appService.catalogCategories.filter((catalogCategory: CatalogCategory): boolean => catalogCategory.name.toLowerCase() !== 'все');
    this.catalogItemForm = this._appService.catalogItemForm();
  }

  public ngOnInit(): void {
    if (this.data) {
      this.catalogItemForm.patchValue({...this.data});
    }
  }

  /**
   * Метод закрытия диалога с отправкой данных
   *
   * @param {CatalogItem} data - данные товара
   */
  public closeCatalogItemDialog(data?: CatalogItem): void {
    this.dialogRef.close(data);
  }

}
