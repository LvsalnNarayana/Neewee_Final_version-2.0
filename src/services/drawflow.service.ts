import { DataTransform } from 'src/services/DataTransform.service';
import { Required_functionalities } from 'src/services/required_functionalities.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class Drawflow {
  constructor(
    private DataTransform: DataTransform,
    private router: Router,
    private Required_functionalities: Required_functionalities
  ) { }
  filter_node_created(e: any) {
    const promise = new Promise((resolve, reject) => {
      if (this.DataTransform.transforms[0].filters.length < 1) {
        resolve(this.DataTransform.create_new_filter());
      } else {
        var filter_exist = new CustomEvent("filter_exists", {
          'detail': { _id: e.detail._id },
        });
        resolve(document.dispatchEvent(filter_exist))
      }
    });
    promise.then(() => {
      this.router.navigateByUrl('/document/filter')
    });
  }
  data_node_created(e: any) {
    var if_data_exists = new CustomEvent("if_data_exists", {
      'detail': { _id: e.detail._id }
    });
    document.dispatchEvent(if_data_exists);

  }
  output_node_created(e: any) {
    this.router.navigateByUrl('/document/join');
    var if_output_exists = new CustomEvent("if_output_exists", {
      'detail': { _id: e.detail._id }
    });
    document.dispatchEvent(if_output_exists);
  }
  filter_node_deleted() {
    this.DataTransform.filter_connected_reset_status();
    this.DataTransform.clear_filter();
    this.router.navigateByUrl('/document/data');
  }
  data_node_deleted() {
  }
  output_node_deleted() {
    this.DataTransform.join_connected_reset_status();
    this.DataTransform.clear_join();
    this.Required_functionalities.join_connected_reset_status();
    this.router.navigateByUrl('/document/data');
  }
  data_filter_connection_created() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.filter_connected_status = true)
    });
    promise.then(() => {
      this.DataTransform.change_behaviour_sub();
    }).then(() => {
      this.router.navigateByUrl('/document/filter')
    });
  }
  data_filter_connection_removed() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.filter_connected_reset_status())
    });
    promise.then(() => {
      this.DataTransform.join_connected_reset_status();
    }).then(() => {
      this.DataTransform.change_behaviour_sub();
    }).then(() => {
      this.router.navigateByUrl('/document/filter');
    });
  }
  data_output_connection_created() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.join_connected_status = true)
    });
    promise.then(() => {
      this.DataTransform.change_behaviour_sub();
    }).then(() => {
      this.router.navigateByUrl('/document/join')
    });
  }
  data_output_connection_removed() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.join_connected_reset_status())
    });
    promise.then(() => {
      this.DataTransform.change_behaviour_sub();
    }).then(() => {
      this.router.navigateByUrl('/document/join')
    });
  }
  filter_output_connection_created() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.join_connected_status = true)
    });
    promise.then(() => {
      this.DataTransform.change_behaviour_sub();
    }).then(() => {
      this.router.navigateByUrl('/document/join')
    });
  }
  filter_output_connection_removed() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.join_connected_reset_status())
    });
    promise.then(() => {
      this.DataTransform.change_behaviour_sub();
    }).then(() => {
      this.router.navigateByUrl('/document/join')
    });
  }
  filter_node_selected() {
    this.router.navigateByUrl('/document/filter');
  }
  data_node_selected() {
    this.router.navigateByUrl('/document/data');
  }
  output_node_selected() {
    this.router.navigateByUrl('/document/join');
  }
}
