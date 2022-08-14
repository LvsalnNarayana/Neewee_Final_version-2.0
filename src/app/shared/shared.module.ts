import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullTableComponent } from './full-table/full-table.component';
import { ModalBoxComponent } from './modal-box/modal-box.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FullTableComponent,
    ModalBoxComponent,
    ToolboxComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  exports: [
    FullTableComponent,
    ModalBoxComponent,
    ToolboxComponent
  ]
})
export class SharedModule { }
