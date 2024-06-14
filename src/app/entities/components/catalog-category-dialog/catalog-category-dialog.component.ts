import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {FormGroup} from "@angular/forms";
import {CatalogCategory} from "../../interfaces/catalog-category.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-catalog-category-dialog',
  templateUrl: './catalog-category-dialog.component.html',
  styleUrls: ['./catalog-category-dialog.component.scss']
})
export class CatalogCategoryDialogComponent implements OnInit {
  public catalogCategoryForm: FormGroup;
  public catalogCategories: CatalogCategory[] = [];

  constructor(
    public dialogRef: MatDialogRef<CatalogCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CatalogCategory,
    private readonly _appService: AppService
  ) {
    this.catalogCategoryForm = this._appService.catalogCategoryForm();
    this.catalogCategories = this._appService.catalogCategories;
  }

  public ngOnInit(): void {
    if (this.data) {
      this.catalogCategoryForm.patchValue({...this.data});
    }
  }

  /**
   * Добавление категории
   *
   * @param {CatalogCategory} data - данные категории
   */
  public closeCatalogCategoryDialog(data?: CatalogCategory): void {
    this.dialogRef.close(data);
  }

}
