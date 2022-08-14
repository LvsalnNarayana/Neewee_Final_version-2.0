import { DataTransform } from 'src/services/DataTransform.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Data_1 } from 'src/services/data_1.service';
import { Required_functionalities } from 'src/services/required_functionalities.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  //assigning form_id to each form for retrieving
  @Input() form_id!: number;

  //declaring reactive form
  form_filter!: FormGroup;

  //filter_check variable for checking filter and populating filter filter values
  filter_check: any;

  //for assgning dynamic filter names
  filter_name: any;

  //column dropdown options
  column_key_options: any = [];

  constructor(

    //importing data methods for creating filters
    private DataTransform: DataTransform,

    //importing data methods for creating filters
    private Data_1: Data_1,

    //importing required functionalities
    private Required_functionalities: Required_functionalities
  ) { }

  ngOnInit(): void {
    //looping through column keys for options in filter
    var data_keys = Object.keys(this.Data_1.data_1[0]);
    var data_keys_obj: any = {};
    for (const data_key of data_keys) {
      data_keys_obj[`${data_key}`] = data_key;
    }
    this.column_key_options = [{ ...data_keys_obj }];

    //assigning values to filter check for populating filter form
    this.filter_check = this.DataTransform.get_filter_by_id(this.form_id);

    //filter length for form filter name
    this.filter_name = this.DataTransform.get_filter_by_id(this.form_id)[0].filter_name;

    //programatic form
    this.form_filter = new FormGroup({
      'condition': new FormControl(this.filter_check[0].condition != 'and'),
      'keep_remove_group': new FormGroup({
        'keep_remove': new FormControl('keep'),
      }),
      'filter_id': new FormControl(this.form_id),
      'column_key': new FormControl(this.filter_check[0].key),
      'operator': new FormControl(this.filter_check[0].operator),
      'filter_value': new FormControl(this.filter_check[0].value),
    });
    //checking for form values changes and assgning it to filter objects
    this.form_filter.valueChanges.subscribe(arg => {
      var filter_form_data = {
        _id: arg.filter_id,
        key: arg.column_key,
        value: arg.filter_value,
        operator: arg.operator,
        condition: arg.condition
      };
      this.DataTransform.update_filter(filter_form_data)
    })
  }

  //delete filter function
  delete_filter() {
    //for deleteing filter based on id
    this.Required_functionalities.filter_delete_main(this.form_id);
  }
}
