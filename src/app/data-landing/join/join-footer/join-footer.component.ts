import { Required_functionalities } from './../../../../services/required_functionalities.service';
import { DataTransform } from 'src/services/DataTransform.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-footer',
  templateUrl: './join-footer.component.html',
  styleUrls: ['./join-footer.component.css']
})
export class JoinFooterComponent implements OnInit {

  //drop down status
  drop_down = false;

  data_ok_continue_status = this.Required_functionalities.join_data_object.data_ok_continue_status;
  join_connected_status = this.DataTransform.join_connected_status;

  //show apply button
  show_apply_btn = this.Required_functionalities.join_data_object.join_column_container;

  constructor(
    //importing data methods
    private DataTransform: DataTransform,

    //import required functionalities
    private Required_functionalities: Required_functionalities,

    //import router for navigation
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.join_connected_status = this.DataTransform.join_connected_status;
    this.data_ok_continue_status = this.Required_functionalities.join_data_object.data_ok_continue_status;
    this.show_apply_btn = this.Required_functionalities.join_data_object.join_column_container;
  }
  // drop down toggle function
  dropdown() {
    // this.drop_down = !this.drop_down;
  }

  //navigate to previous step if filter applied only
  prev_nav() {
    this.router.navigateByUrl('/document/data');
  }
  edit_join() {
    this.Required_functionalities.join_data_object.data_ok_continue_status = false;
    if (this.DataTransform.join_connected_status = true) {
      const promise = new Promise((resolve, reject) => {
        resolve(this.DataTransform.join_connected_status = false)
      })
      promise.then(() => {
        var data_edit_mode = new CustomEvent("data_edit_mode");
        document.dispatchEvent(data_edit_mode);
      }).then(() => {
        this.DataTransform.change_behaviour_sub();
      }).then(() => {
        this.router.navigateByUrl('/document/join')
      })
    }
  }
  continue_join() {
    this.Required_functionalities.join_data_object.data_ok_continue_status = true;
  }
  apply_join() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.join_connected_status = true)
    })
    promise.then(() => {
      var data_applied = new CustomEvent("data_applied");
      document.dispatchEvent(data_applied);
    }).then(() => {
      this.DataTransform.change_behaviour_sub();
    }).then(() => {
      this.router.navigateByUrl('/document/join')
    })
  }
}
