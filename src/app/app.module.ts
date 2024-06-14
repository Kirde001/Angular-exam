import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CatalogComponent} from './entities/components/catalog/catalog.component';
import {AdminComponent} from './entities/components/admin/admin.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {provideAnimations} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {CatalogFilterPipe} from "./entities/pipes/catalog-filter.pipe";
import {CatalogItemDialogComponent} from './entities/components/catalog-item-dialog/catalog-item-dialog.component';
import {CatalogCategoryDialogComponent} from './entities/components/catalog-category-dialog/catalog-category-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    AdminComponent,
    CatalogFilterPipe,
    CatalogItemDialogComponent,
    CatalogCategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    provideAnimations()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
