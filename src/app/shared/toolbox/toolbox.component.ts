import { Component, OnInit } from '@angular/core';
import { Required_functionalities } from 'src/services/required_functionalities.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {

  //data status variable
  data_status: any;

  constructor(
    //import required functionalities
    private Required_functionalities: Required_functionalities
  ) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    //data status for sidebar toggle only in /data route
    this.data_status = this.Required_functionalities.data_sidebar_status;
  }
  //sibebar toggle function
  sidebar_toggle() {
    this.Required_functionalities.sidebar_toggle();
  }

}
