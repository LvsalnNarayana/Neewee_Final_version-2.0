import { Component, OnInit } from '@angular/core';
import { DataTransform } from 'src/services/DataTransform.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  //assigning filter applied status
  join_status = this.DataTransform.join_connected_status;

  constructor(
    //importing data methods
    private DataTransform: DataTransform) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.join_status = this.DataTransform.join_connected_status;

  }
}
