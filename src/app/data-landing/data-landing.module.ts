import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataLandingRoutingModule } from './data-landing-routing.module';
import { DataLandingComponent } from './data-landing.component';
import { DataComponent } from './data/data.component';
import { JoinComponent } from './join/join.component';
import { FilterComponent } from './filter/filter.component';
import { DragComponent } from './drag/drag.component';
import { FilterHeaderComponent } from './filter/filter-header/filter-header.component';
import { FilterFooterComponent } from './filter/filter-footer/filter-footer.component';
import { FilterContainerComponent } from './filter/filter-container/filter-container.component';
import { FilterFormComponent } from './filter/filter-container/filter-form/filter-form.component';
import { FilterSummaryComponent } from './filter/filter-summary/filter-summary.component';
import { DataHeaderComponent } from './data/data-header/data-header.component';
import { DataFooterComponent } from './data/data-footer/data-footer.component';
import { DataTableComponent } from './data/data-table/data-table.component';
import { SharedModule } from '../shared/shared.module';
import { JoinHeaderComponent } from './join/join-header/join-header.component';
import { JoinFooterComponent } from './join/join-footer/join-footer.component';
import { JoinContainerComponent } from './join/join-container/join-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinSummaryComponent } from './join/join-summary/join-summary.component';


@NgModule({
  declarations: [
    DataLandingComponent,
    DataComponent,
    JoinComponent,
    FilterComponent,
    DragComponent,
    FilterHeaderComponent,
    FilterFooterComponent,
    FilterContainerComponent,
    FilterFormComponent,
    FilterSummaryComponent,
    DataHeaderComponent,
    DataFooterComponent,
    DataTableComponent,
    JoinHeaderComponent,
    JoinFooterComponent,
    JoinContainerComponent,
    JoinSummaryComponent
  ],
  imports: [
    CommonModule,
    DataLandingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class DataLandingModule { }
