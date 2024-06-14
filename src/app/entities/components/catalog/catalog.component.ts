import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {CatalogCategory} from "../../interfaces/catalog-category.interface";
import {CatalogItem} from "../../interfaces/catalog-item.interface";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public catalogFilterStateForm: FormGroup;
  public catalogItemsTableData: CatalogItem[] = [];
  public catalogCategories: CatalogCategory[] = [];

  constructor(
    private readonly _appService: AppService
  ) {
    this.catalogItemsTableData = this._appService.catalogItems;
    this.catalogCategories = this._appService.catalogCategories;
    this.catalogFilterStateForm = this._appService.catalogFilterStateForm();
  }

  public ngOnInit(): void {
    this.catalogFilterStateForm.valueChanges.subscribe((filterStateValue: any): void => {
      if (filterStateValue.sortType == 1) {
        this.catalogItemsTableData.sort((a: CatalogItem, b: CatalogItem) => a.price - b.price);
      } else {
        this.catalogItemsTableData.sort((a: CatalogItem, b: CatalogItem) => b.price - a.price);
      }
    });
  }
}
