import { Component, OnInit } from '@angular/core';
import { DataTransform } from 'src/services/DataTransform.service';

@Component({
  selector: 'app-full-table',
  templateUrl: './full-table.component.html',
  styleUrls: ['./full-table.component.css']
})
export class FullTableComponent implements OnInit {
  //for storing data
  storedata: any = [];

  //for storing storedata keys
  storedata_keys: any = [];

  //declaring string for search
  filtered_string = '';

  constructor(

    //importing data methods
    private DataTransform: DataTransform,
  ) { }

  ngOnInit(): void {
    this.DataTransform.change_behaviour_sub();
    this.DataTransform.Observable
      .subscribe((data: any) => {
        this.storedata_keys = data.data_keys;
        this.storedata = data.data;
        return this.storedata, this.storedata_keys;
      });
  }
}
