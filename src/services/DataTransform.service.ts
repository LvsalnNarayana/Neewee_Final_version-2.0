import { Data_2 } from './data_2.service';
import { Data_1 } from './data_1.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import 'lodash';
declare var _: any;
import * as array_join from 'array-join'
import { FormControl } from '@angular/forms';

@Injectable()
export class DataTransform {
  constructor(
    private Data_1: Data_1,
    private Data_2: Data_2
  ) { }
  //=====================
  //Initial id for filter
  //=====================
  initial_id = 10000;
  filter_connected_status = false;
  join_connected_status = false;
  insert_data1 = this.Data_1.data_1;
  insert_data2 = this.Data_2.data_2;
  filtered_data = [{ filter_id: '', condition: 'or', filter_value: [], result: this.insert_data1 }];
  result_array = [...this.filtered_data[0].result];
  filter_result: any;
  current_keys_formcontrol: any = {};
  new_keys_formcontrol: any = {};
  // filters: any = [];
  // ===============
  // Transforms data
  // ===============
  transforms: any = [
    {
      join_meta: [{
        join_type: 'no_join',
        left_array: [],
        right_array: []
      }],
      filters: []
    }
  ];
  // ===============
  // Observable
  // ===============
  // transform_subject = new BehaviorSubject(this.transforms);
  transform_subject = new Subject();
  Observable = this.transform_subject.asObservable();
  async change_behaviour_sub() {
    const filtered_data = await this.filter_function(this.insert_data1);
    const conditional_data = await this.filter_conditional_output(filtered_data);
    const join_data = this.join_data(conditional_data, this.insert_data2);
    const selected_join_data = this.select_from_join_data(join_data, this.join_connected_status);
    const data_keys = await Object.keys(selected_join_data[0]);
    const storedata_keys = await this.data__2_keys_object(data_keys);
    const storedata_keys_length = await Object.keys(storedata_keys).length
    await this.transform_subject.next({ data: selected_join_data, data_keys: storedata_keys, data_keys_length: storedata_keys_length });
  }
  data__2_keys_object(data: any) {
    const data_key_obj: any = {};
    for (const data_key of data) {
      data_key_obj[`${data_key}`] = data_key;
    }
    return data_key_obj
  }
  // ===============
  // filter function
  // ===============
  filter_function(data_to_be_filtered: any) {
    this.filtered_data = [{ filter_id: '', condition: 'or', filter_value: [], result: this.insert_data1 }];
    this.transforms[0].filters.forEach((filter: any, i: any) => {
      if ((filter.key != '' && filter.key != null) && (filter.value.length > 0 && filter.value != '')) {
        var local_filtered_array: any[] = [];
        var multiple_values = filter.value;
        multiple_values = multiple_values.map((value: any) => {
          if (isNaN(value) == true) {
            return value
          } else {
            return Number(value)
          }
        });
        multiple_values.forEach((element: any) => {
          local_filtered_array.push(
            _.filter(
              data_to_be_filtered, (single_storedata: any) => {
                if (typeof (element) == 'number') {
                  if (filter.operator == 'equal') {
                    return single_storedata[filter.key] == element
                  }
                  if (filter.operator == 'notequal') {
                    return single_storedata[filter.key] != element
                  }
                  if (filter.operator == 'greater') {
                    return single_storedata[filter.key] > element
                  }
                  if (filter.operator == 'lesser') {
                    return single_storedata[filter.key] < element
                  }
                  if (filter.operator == 'greaterorequal') {
                    return single_storedata[filter.key] >= element
                  }
                  if (filter.operator == 'lesser0requal') {
                    return single_storedata[filter.key] <= element
                  }
                }
                if (typeof (element) === 'string') {
                  if (filter.operator == 'equal') {
                    return single_storedata[filter.key] == element
                  }
                  if (filter.operator == 'notequal') {
                    return single_storedata[filter.key] != element
                  }
                }
              }
            )
          )
          // console.log(local_filtered_array);
        });
        this.filter_result = _.flatMap([...local_filtered_array]);
        this.filtered_data.push({ filter_id: filter._id, condition: filter.condition, filter_value: filter.value, result: this.filter_result });
        this.filtered_data = _.uniqBy(this.filtered_data, 'filter_id');
      }
    });
    return _.uniqBy(this.filtered_data, 'filter_id');
  }
  // ==================================
  // filter conditional output function
  // ==================================
  filter_conditional_output(filtered_data: any) {
    this.result_array = [...this.filtered_data[0].result];
    if (this.filter_connected_status == true) {
      if (filtered_data.length > 1) {
        for (let i = 1; i < filtered_data.length; i++) {
          if (filtered_data[i].condition == 'and') {
            this.result_array = _.intersection(this.result_array, filtered_data[i].result);
          }
          if (filtered_data[i].condition == 'or') {
            this.result_array = _.union(this.result_array, _.xor(this.result_array, _.intersection(filtered_data[i].result, this.result_array)));
          }
        }
      }
      return this.result_array
    }
    if (this.filter_connected_status == false) {
      this.filtered_data = [{ filter_id: '', condition: 'or', filter_value: [], result: this.insert_data1 }];
      return this.result_array = [...this.insert_data1];
    }
  }
  // =================
  // update join meta
  // =================
  update_join_meta(join_meta_data: any) {
    this.transforms[0].join_meta[0].join_type = join_meta_data.join_type;
    this.transforms[0].join_meta[0].left_array = [...this.return_true_key(join_meta_data.current_data)];
    this.transforms[0].join_meta[0].right_array = [...this.return_true_key(join_meta_data.new_data)];
  }
  return_true_key(object_data: any) {
    var true_array = [];
    if (object_data != undefined) {
      for (const key in object_data) {
        object_data[key] == true ? true_array.push(key) : null
      }
    }
    return true_array
  }
  // =================
  // data left join
  // =================
  data_left_join(filtered_data: any, to_join_data: any) {
    return array_join.leftJoin(
      filtered_data,
      to_join_data,
      (left: any) => left.Invoice_ID,
      (right: any) => right.Invoice_ID,
      (left, right) => ({ ...left, ...right }))
  }
  // =================
  // data right join
  // =================
  data_right_join(filtered_data: any, to_join_data: any) {
    return array_join.leftJoin(
      to_join_data,
      filtered_data,
      (left: any) => left.Invoice_ID,
      (right: any) => right.Invoice_ID,
      (left, right) => ({ ...left, ...right }))
  }
  // =================
  // data full join
  // =================
  data_full_join(filtered_data: any, to_join_data: any) {
    return array_join.fullJoin(
      to_join_data,
      filtered_data,
      (left: any) => left.Invoice_ID,
      (right: any) => right.Invoice_ID,
      (left, right) => ({ ...left, ...right }))
  }
  // =================
  // main join data
  // =================
  join_data(filtered_data: any, to_join_data: any) {
    if (this.transforms[0].join_meta.length == 1 && this.join_connected_status == true) {
      if (this.transforms[0].join_meta[0].join_type == 'left_join') {
        return this.data_left_join(filtered_data, to_join_data);
      } else
        if (this.transforms[0].join_meta[0].join_type == 'right_join') {
          return this.data_right_join(to_join_data, filtered_data);
        } else
          if (this.transforms[0].join_meta[0].join_type == 'full_join') {
            return this.data_full_join(filtered_data, to_join_data);
          } else {
            return filtered_data
          }
    } else {
      return filtered_data
    }
  }
  // =====================
  // select from join data
  // =====================
  select_from_join_data(incoming_data: any, join_connected: any) {
    var joined_keys = [...this.transforms[0].join_meta[0].left_array, ...this.transforms[0].join_meta[0].right_array];
    if (join_connected === true) {
      var selected_array: any = [];
      if (joined_keys.length > 0) {
        incoming_data.forEach((data: any) => {
          selected_array.push({ ..._.pick(data, ['Invoice_ID']), ..._.pick(data, joined_keys) });
        })
        return selected_array;
      } if (joined_keys.length == 0) {
        return incoming_data
      }
    }
    if (join_connected === false) {
      return incoming_data
    }
  }
  //=================
  //create new filter
  //=================
  create_new_filter() {
    const new_filter = {
      _id: this.initial_id + this.transforms[0].filters.length,
      filter_name: 'Filter ' + (this.transforms[0].filters.length + 1),
      key: '',
      value: [],
      operator: 'equal',
      condition: 'and'
    };
    this.transforms[0].filters.push(new_filter);
  }
  //=================
  //get filter by id
  //=================
  get_filter_by_id(id: any) {
    return this.transforms[0].filters.filter((search_filter: any) => {
      return search_filter._id == id;
    })
  }
  //=============
  //update filter
  //=============
  update_filter(updated_filter: any) {
    var filter_update = this.get_filter_by_id(updated_filter._id);
    var filter_value = (updated_filter.value.length == 0) ? [] : updated_filter.value.toString().split(',');
    var filter_condition = updated_filter.condition == true ? 'or' : 'and';
    filter_update[0].value = filter_value;
    filter_update[0].key = updated_filter.key;
    filter_update[0].operator = updated_filter.operator;
    filter_update[0].condition = filter_condition;
  }
  //=============
  //delete filter
  //=============
  delete_filter(id: any) {
    let filter_index = this.transforms[0].filters.findIndex((filter: { _id: any; }) => filter._id == id);
    this.transforms[0].filters.splice(filter_index, 1);
    let filtered_array_index = this.filtered_data.findIndex((filter) => filter.filter_id == id);
    if (filtered_array_index != -1) {
      this.filtered_data.splice(filtered_array_index, 1);
    }
  }
  //=============
  //clear filter
  //=============
  clear_filter() {
    this.transforms[0].filters = [];
  }
  //=============
  //clear join
  //=============
  clear_join() {
    this.transforms[0].join_meta[0] = {
      join_type: 'no_join',
      left_array: [],
      right_array: []
    };
  }
  //========================
  //create join form control
  //========================
  create_join_controls(current_keys: any, new_keys: any) {
    current_keys.forEach((element: any) => {
      this.current_keys_formcontrol[element] = new FormControl(this.current_return_value(element, this.transforms[0].join_meta[0].left_array));
    });
    new_keys.forEach((element: any) => {
      this.new_keys_formcontrol[element] = new FormControl(this.current_return_value(element, this.transforms[0].join_meta[0].right_array));
    });
  }
  current_return_value(element: any, to_compare: any) {
    return to_compare.includes(element)
  }
  //=============
  //delete key
  //=============
  delete_right_key(value: any) {
    this.transforms[0].join_meta[0].right_array.splice(this.transforms[0].join_meta[0].right_array.findIndex((data: any) => {
      return data == value
    }), 1);
  }
  delete_left_key(value: any) {
    this.transforms[0].join_meta[0].left_array.splice(this.transforms[0].join_meta[0].left_array.findIndex((data: any) => {
      return data == value
    }), 1);
  }
  //reset filter connected status for adding new filter
  filter_connected_reset_status() {
    this.filter_connected_status = false;
  }
  //reset join connected status for adding new filter
  join_connected_reset_status() {
    this.join_connected_status = false;
  }
}
