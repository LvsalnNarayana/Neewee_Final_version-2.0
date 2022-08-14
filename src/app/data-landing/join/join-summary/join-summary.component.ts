import { Required_functionalities } from 'src/services/required_functionalities.service';
import { DataTransform } from 'src/services/DataTransform.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-summary',
  templateUrl: './join-summary.component.html',
  styleUrls: ['./join-summary.component.css']
})
export class JoinSummaryComponent implements OnInit {

  join_summary = this.DataTransform.transforms[0].join_meta[0];
  join_name:any;
  required_functionalities = this.Required_functionalities;

  constructor(
    private DataTransform:DataTransform,
    private Required_functionalities:Required_functionalities
  ) { }

  ngOnInit(): void {
    this.join_summary = this.DataTransform.transforms[0].join_meta[0];
    if (this.join_summary.join_type == 'left_join') {
      this.join_name = 'Left Join'
    }
    if (this.join_summary.join_type == 'right_join') {
      this.join_name = 'Right Join'
    }
    if (this.join_summary.join_type == 'inner_join') {
      this.join_name = 'Inner Join'
    }
    if (this.join_summary.join_type == 'full_join') {
      this.join_name = 'Full Join'
    }
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.required_functionalities = this.Required_functionalities;
  }
}
