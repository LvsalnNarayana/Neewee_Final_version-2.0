import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add_catalog', component: AddCatalogComponent },
  { path: 'document', loadChildren: () => import('./data-landing/data-landing.module').then(m => m.DataLandingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
