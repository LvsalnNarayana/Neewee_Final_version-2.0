import { Required_functionalities } from 'src/services/required_functionalities.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-data-landing',
  templateUrl: './data-landing.component.html',
  styleUrls: ['./data-landing.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('400ms cubic-bezier(.25,.75,.5,1.25)', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(.25,.75,.5,1.25)', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class DataLandingComponent implements OnInit {


  //for storing modal box status
  full_table_status: boolean = this.Required_functionalities.full_table_status;

  //filter delete confirmation
  filter_delete_confirmation: boolean = this.Required_functionalities.filter_delete_confirmation;

  constructor(

    //import required functionalities
    private Required_functionalities: Required_functionalities

  ) { }

  //sidebar status variable
  sidebar_open: any;

  ngOnInit(): void {
    this.Required_functionalities.data_sidebar_status_reset();
  }
  ngDoCheck(): void {
    //check for sidebar status
    this.sidebar_open = this.Required_functionalities.sidebar_status;

    //check for full table status
    this.full_table_status = this.Required_functionalities.full_table_status;

    //filter delete confirmation
    this.filter_delete_confirmation = this.Required_functionalities.filter_delete_confirmation;

  }
  delete_filter(){
    this.Required_functionalities.filter_delete_yes()
  }
  cancel_delete_filter(){
    this.Required_functionalities.filter_delete_no();
  }
}
