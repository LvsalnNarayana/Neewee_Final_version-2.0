import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataLandingComponent } from './data-landing.component';
import { DataComponent } from './data/data.component';
import { FilterComponent } from './filter/filter.component';
import { JoinComponent } from './join/join.component';

const routes: Routes = [{
  path: '', component: DataLandingComponent,
  children: [
    { path: 'data', component: DataComponent },
    { path: 'filter', component: FilterComponent },
    { path: 'join', component: JoinComponent }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataLandingRoutingModule { }
