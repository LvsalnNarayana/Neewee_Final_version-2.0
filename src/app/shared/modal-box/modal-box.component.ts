
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Required_functionalities } from 'src/services/required_functionalities.service';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {
  @ViewChild('box_title')
  box_title!: ElementRef
  constructor(
    private Required_functions: Required_functionalities
  ) { }
  // ======================================================================
  // start of drag table logic
  // ======================================================================
  mouseDown = false;
  startX: any;
  scrollLeft: any;
  slider = document.querySelector<HTMLElement>('.parent');
  startDragging(e: { pageX: number; }, flag: any, el: { offsetLeft: number; scrollLeft: any; }) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }
  stopDragging(e: any, flag: any) {
    this.mouseDown = false;
  }
  moveEvent(e: { preventDefault: () => void; pageX: number; }, el: { offsetLeft: number; scrollLeft: number; }) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }
  // ======================================================================
  // end of drag table logic
  // ======================================================================
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    //===============================
    //for dynamic width of data table
    //===============================
    if (this.box_title.nativeElement.children[0].classList[1] == 'table_data') {
      this.box_title.nativeElement.parentElement.parentElement.parentElement.classList.add('table_data')
    }
  }
  modalbox_close() {
    this.Required_functions.modal_box_close();
  }
}
