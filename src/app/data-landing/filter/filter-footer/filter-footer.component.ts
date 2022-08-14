import { DataTransform } from 'src/services/DataTransform.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-footer',
  templateUrl: './filter-footer.component.html',
  styleUrls: ['./filter-footer.component.css']
})
export class FilterFooterComponent implements OnInit {

  //drop down status
  drop_down = false;

  //check for filters
  filters = this.DataTransform.transforms[0].filters;

  //assigning filter applied status
  filter_applied_status = this.DataTransform.filter_connected_status;

  constructor(
    //import router for navigation
    private router: Router,

    //importing data transform services
    private DataTransform: DataTransform

  ) { }

  ngOnInit(): void {

  }
  ngDoCheck(): void {

    //check for filter to find length before applying filter
    this.filters = this.DataTransform.transforms[0].filters

    //checking for filter applied status
    this.filter_applied_status = this.DataTransform.filter_connected_status;
  }
  // drop down toggle function [removed]
  dropdown() {
    // this.drop_down = !this.drop_down;
  }

  //navigate to previous step
  prev_nav() {
    this.router.navigateByUrl('/document/data');
  }

  //reset filter applied status to edit filter and to remove connection of nodes
  edit_filter() {
    //filter connection reset function
    this.DataTransform.filter_connected_reset_status();
    //dispatch event for removing filter connection
    var filter_edit_mode = new CustomEvent("filter_edit_mode");
    document.dispatchEvent(filter_edit_mode);
  }

  //apply filter function
  apply_filter() {
    if (this.filters.length > 0) {
      const promise = new Promise((resolve, reject) => {
        resolve(this.DataTransform.filter_connected_status = true)
      })
      promise.then(() => {
        //dispatch event for applying filter
        var filter_applied = new CustomEvent("filter_applied");
        document.dispatchEvent(filter_applied);
      }).then(() => {
        this.DataTransform.change_behaviour_sub();
      });
    } else {
      this.router.navigateByUrl('/document/data')
    }
  }
}
