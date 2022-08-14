import { Required_functionalities } from 'src/services/required_functionalities.service';
import { DataTransform } from 'src/services/DataTransform.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Data_1 } from 'src/services/data_1.service';
import { Data_2 } from 'src/services/data_2.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-join-container',
  templateUrl: './join-container.component.html',
  styleUrls: ['./join-container.component.css'],
  animations: [
    trigger('zoomout', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('200ms cubic-bezier(.25,.75,.5,1.25)', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(.25,.75,.5,1.25)', style({ transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class JoinContainerComponent implements OnInit {
  //iimporting data_join_object for all functionalities of join  container
  join_data_object = this.Required_functionalities.join_data_object;
  //declaring reactive form group
  join_data!: FormGroup;
  //variable to store current data keys
  current_data_keys: any = [];
  //variable to store new data keys
  new_data_keys: any = [];
  //assgning data ok continue status for switching between continue and apply buttons
  data_ok_continue_status = this.Required_functionalities.join_data_object.data_ok_continue_status;
  //assgning data connected status to variable
  data_connected_status = this.DataTransform.join_connected_status;
  //assigning left and right arrays to variables
  left_array = this.DataTransform.transforms[0].join_meta[0].left_array;
  right_array = this.DataTransform.transforms[0].join_meta[0].right_array;
  //element reference for changing catalog name text style
  @ViewChild('catalog_name')
  inputElement!: ElementRef;
  constructor(
    //importing data 1 for column dropdown options
    private Data_1: Data_1,
    //importing data 2 for column dropdown options
    private Data_2: Data_2,
    //importing form builder for column dropdown options grouping
    private formbuilder: FormBuilder,
    //importing data transforms
    private DataTransform: DataTransform,
    //importing required functionalities
    private Required_functionalities: Required_functionalities
  ) { }
  //current data variable for fetching and assigning existing data
  current_data: any;
  ngOnInit(): void {
    this.current_data_keys = [...Object.keys(this.Data_1.data_1[0])];
    this.new_data_keys = [...Object.keys(this.Data_2.data_2[0])];
    var current_data_index = this.current_data_keys.findIndex((current_data: any) => {
      return current_data = 'Invoice_ID'
    })
    var new_data_index = this.new_data_keys.findIndex((new_data: any) => {
      return new_data = 'Invoice_ID'
    })
    this.current_data_keys.splice(current_data_index, 1);
    this.new_data_keys.splice(new_data_index, 1);
    let current_keys_group: any = {};
    let new_keys_group: any = {};
    this.current_data_keys.forEach((element: any) => {
      current_keys_group[element] = new FormControl(this.current_return_value(element, this.DataTransform.transforms[0].join_meta[0].left_array));
    });
    this.new_data_keys.forEach((element: any) => {
      new_keys_group[element] = new FormControl(this.current_return_value(element, this.DataTransform.transforms[0].join_meta[0].right_array));
    });
    this.join_data = this.formbuilder.group({
      'join_type': new FormControl('left_join'),
      'current_data': new FormGroup({
        ...current_keys_group
      }),
      'new_data': new FormGroup({
        ...new_keys_group
      })
    });
    this.join_data.valueChanges.subscribe((arg) => {
      this.DataTransform.update_join_meta(arg)
    })
  }
  current_return_value(element: any, to_compare: any) {
    return to_compare.includes(element)
  }
  ngDoCheck(): void {
    this.data_connected_status = this.DataTransform.join_connected_status;
    this.data_ok_continue_status = this.Required_functionalities.join_data_object.data_ok_continue_status;
    this.join_data_object = this.Required_functionalities.join_data_object;
    this.left_array = this.DataTransform.transforms[0].join_meta[0].left_array;
    this.right_array = this.DataTransform.transforms[0].join_meta[0].right_array;
  }
  show_join_merge_dropdown() {
    this.Required_functionalities.join_data_object.join_merge_dropdown_status = !this.Required_functionalities.join_data_object.join_merge_dropdown_status;
  }
  show_catalog_dropdown() {
    this.Required_functionalities.join_data_object.select_catalog_toggle = !this.Required_functionalities.join_data_object.select_catalog_toggle;
  }
  reset_show_join_merge_status(value: any) {
    this.Required_functionalities.join_data_object.join_merge_dropdown_status = false;
    this.Required_functionalities.join_data_object.show_select_data_catalog = true;
    this.Required_functionalities.join_data_object.join_merge_text = value
  }
  select_catalog(value: any, element: any) {
    this.inputElement.nativeElement.classList.remove('text-muted');
    this.inputElement.nativeElement.classList.add('text-primary');
    this.Required_functionalities.join_data_object.show_catalog = false;
    this.Required_functionalities.join_data_object.data_catalog_name = value;
    this.Required_functionalities.join_data_object.join_column_container = true;
    var catalog_selected = new CustomEvent("catalog_selected", {
      detail: { catalog_name: value },
    });
    document.dispatchEvent(catalog_selected);
  }
  show_column_dropdown(value: any) {
    if (value == 'current') {
      this.Required_functionalities.join_data_object.show_column_data_list_current = !this.Required_functionalities.join_data_object.show_column_data_list_current;
    }
    if (value == 'new') {
      this.Required_functionalities.join_data_object.show_column_data_list_new = !this.Required_functionalities.join_data_object.show_column_data_list_new;
    }
  }
  delete_right_key(value: any) {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.delete_right_key(value))
    })
    promise.then(() => {
      this.DataTransform.change_behaviour_sub()
    })
    trigger('zoomout', [
      transition(':leave', [
        animate('200ms cubic-bezier(.25,.75,.5,1.25)', style({ transform: 'scale(0)' }))
      ])
    ])
  }
  delete_left_key(value: any) {
    const promise = new Promise((resolve, reject) => {
      resolve(this.DataTransform.delete_left_key(value))
    })
    promise.then(() => {
      this.DataTransform.change_behaviour_sub()
    })
    trigger('zoomout', [
      transition(':leave', [
        animate('200ms cubic-bezier(.25,.75,.5,1.25)', style({ transform: 'scale(0)' }))
      ])
    ])
  }
}
