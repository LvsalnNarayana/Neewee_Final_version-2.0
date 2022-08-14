import { Component, OnInit } from '@angular/core';
import { DataTransform } from 'src/services/DataTransform.service';
import { Required_functionalities } from 'src/services/required_functionalities.service';

@Component({
  selector: 'app-filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrls: ['./filter-summary.component.css']
})
export class FilterSummaryComponent implements OnInit {

  //assigning filters in data methods to filters variable
  filters: any;

  constructor(

    //importing data methods for creating filters
    private DataTransform: DataTransform,

    //import required functionalities
    private Required_functionalities: Required_functionalities

  ) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    //checking for new filters
    this.filters = this.DataTransform.transforms[0].filters;
  }

  //full table modal box open function
  fulltable_open() {
    this.Required_functionalities.full_table_open();
  }
}
