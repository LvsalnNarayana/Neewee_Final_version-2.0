import { DataTransform } from 'src/services/DataTransform.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Required_functionalities {

  constructor(
    private DataTransform: DataTransform
  ) { }
  //sidebar status for sidebar box toggle
  sidebar_status: boolean = true;

  //data status for sidebar toggle only in /data route
  data_sidebar_status: boolean = false;

  //Modal box status for modal box toggle
  modal_box_status: boolean = false;

  //full table status for showing full full data table
  full_table_status = false;

  //filter delete confirmation
  filter_delete_confirmation = false;

  //store filter id temporarily for deleting
  delete_filter_id: any;

  //join data object
  join_data_object = {
    join_merge_dropdown_status: false,
    join_merge_text: 'Join / Merge',
    show_select_data_catalog: false,
    data_catalog_name: 'Select Another Data Catalog',
    select_catalog_toggle:false,
    show_catalog: true,
    join_column_container: false,
    show_column_data_list_current: false,
    show_column_data_list_new: false,
    data_ok_continue_status:false
  }
  //sidebar toggle function
  sidebar_toggle() {
    this.sidebar_status = !this.sidebar_status;
  }
  //data status toggle funtion
  data_sidebar_status_toggle() {
    this.data_sidebar_status = true;
  }
  //data status reset funtion
  data_sidebar_status_reset() {
    this.data_sidebar_status = false;
  }

  //data status open funtion
  full_table_open() {
    this.full_table_status = true;
  }

  // ===================
  // modal box functions
  // ===================
  //modal box open function
  modal_box_open() {
    this.modal_box_status = true;
  }
  //modal box close function
  modal_box_close() {
    this.modal_box_status = false;
    this.full_table_status = false;
    this.filter_delete_confirmation = false;
  }
  // ===============================
  //filter delete yes
  // ===============================
  filter_delete_yes() {
    if (this.delete_filter_id != null || this.delete_filter_id != undefined) {
      let promise = new Promise((resolve, reject) => {
        resolve(this.DataTransform.delete_filter(this.delete_filter_id))
      })
      promise.then(() => {
        this.delete_filter_id = null;
      }).then(() => {
        this.filter_delete_confirmation = false;
      }).then(() => {
        if (this.DataTransform.transforms[0].filters.length == 0) {
          var filter_empty = new CustomEvent("filter_empty", {
            'detail': { _id: this.delete_filter_id },
          });
          document.dispatchEvent(filter_empty);
        }
      })
    }
  }

  //filter delete no
  filter_delete_no() {
    this.filter_delete_confirmation = false
  }
  //filter delete main functionality
  filter_delete_main(id: any) {
    this.filter_delete_confirmation = true;
    this.delete_filter_id = id;
  }
  join_connected_reset_status() {
    this.join_data_object = {
      join_merge_dropdown_status: false,
      join_merge_text: 'Join / Merge',
      select_catalog_toggle:false,
      show_select_data_catalog: false,
      data_catalog_name: 'Select Another Data Catalog',
      show_catalog: true,
      join_column_container: false,
      show_column_data_list_current: false,
      show_column_data_list_new: false,
      data_ok_continue_status:false
    }
  }
}
