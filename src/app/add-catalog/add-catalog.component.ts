import { Required_functionalities } from 'src/services/required_functionalities.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})
export class AddCatalogComponent implements OnInit {

  constructor(
    //importing required functionalities
    private Required_functionalities: Required_functionalities
  ) { }

  ngOnInit(): void {
    //for disabling sidebar toggle button in the toolbar
    this.Required_functionalities.data_sidebar_status_toggle();
  }

}
