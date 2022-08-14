import { Component, OnInit } from '@angular/core';
import { Required_functionalities } from 'src/services/required_functionalities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selected = false;
  constructor(
    //declaring private functionalities
    private Required_functionalities: Required_functionalities,
  ) { }

  //assigning modal box status
  modalbox_status: boolean = this.Required_functionalities.modal_box_status;

  ngOnInit(): void {
  }
  ngDoCheck() {
    //checking for modal box status update
    this.modalbox_status = this.Required_functionalities.modal_box_status;
  }

  //modal box open function
  modalbox_open() {
    this.Required_functionalities.modal_box_open();
  }

  //modal box close function
  modalbox_close() {
    this.Required_functionalities.modal_box_close();
  }
  select_all(){
    this.selected = !this.selected;
  }
}
