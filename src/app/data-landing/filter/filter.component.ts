import { Component, OnInit } from '@angular/core';
import { Required_functionalities } from 'src/services/required_functionalities.service';
import { DataTransform } from 'src/services/DataTransform.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  //assigning filter applied status
  filter_status = this.DataTransform.filter_connected_status;

  constructor(
    //importing data methods
    private DataTransform: DataTransform
  ) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    //checking filter applied status
    this.filter_status = this.DataTransform.filter_connected_status;
  }
}
