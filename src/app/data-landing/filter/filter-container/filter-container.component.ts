import { DataTransform } from 'src/services/DataTransform.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent implements OnInit {

  //assigning filters in datatransforms to filters variable
  filters = this.DataTransform.transforms[0].filters;

  //variable to store form_id in html for sending to filter form
  form_id: any;

  constructor(
    //importing data methods for creating filters
    private DataTransform: DataTransform

  ) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {

    //checking for new filters
    this.filters = this.DataTransform.transforms[0].filters;

  }
  //function for creating new filters
  create_new_filter() {
    const promise = new Promise((resolve, reject) => {
      resolve(true)
    });
    promise.then(() => {
      if (this.DataTransform.transforms[0].filters.length == 0) {
        var new_filter_created = new CustomEvent("new_filter_created");
        document.dispatchEvent(new_filter_created);
      } else {
        this.DataTransform.create_new_filter();
      }
    })
  }
}
