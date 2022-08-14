import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTransform } from 'src/services/DataTransform.service';
import { Data_1 } from 'src/services/data_1.service';
import { Data_2 } from 'src/services/data_2.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { Drawflow } from 'src/services/drawflow.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AddCatalogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    DataTransform,
    Data_1,
    Data_2,
    Drawflow
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
