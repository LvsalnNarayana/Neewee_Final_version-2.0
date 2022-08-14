import { Component, OnInit } from '@angular/core';
import { Required_functionalities } from 'src/services/required_functionalities.service';
import { DataTransform } from 'src/services/DataTransform.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  //for storing data
  storedata: any = [];

  //for storing storedata keys
  storedata_keys: any = [];

  // for storing data keys length
  storedata_keys_length: any;

  //limiting number of rows of display
  number_of_rows = 7;

  constructor(
    //importing required functionalities service
    private Required_functionalities: Required_functionalities,

    //importing datatransform service
    private DataTransform: DataTransform,
  ) { }
  ngOnInit() {
    this.DataTransform.change_behaviour_sub();
    this.DataTransform.Observable
      .subscribe((data: any) => {
        this.storedata_keys = data.data_keys;
        this.storedata = data.data;
        this.storedata_keys_length = data.data_keys_length
        return this.storedata, this.storedata_keys;
      });
  }
  //full table modal box open function
  fulltable_open() {
    this.Required_functionalities.full_table_open();
  }
}
