import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-footer',
  templateUrl: './data-footer.component.html',
  styleUrls: ['./data-footer.component.css']
})
export class DataFooterComponent implements OnInit {

  drop_down = false;

  constructor() { }

  ngOnInit(): void {
  }
  dropdown() {
    //for toggling dropdown
    // this.drop_down = !this.drop_down;
  }
}
