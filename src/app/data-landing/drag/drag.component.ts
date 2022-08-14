import { DataTransform } from 'src/services/DataTransform.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Required_functionalities } from 'src/services/required_functionalities.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Drawflow } from 'src/services/drawflow.service';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent implements OnInit {

  //menu status plus icon menu [removed now]
  open_menu_status = false;

  //checking for sidebar status for full screen drag component
  side_bar_status = this.Required_functionalities.sidebar_status;

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: any,
    private Required_functionalities: Required_functionalities,
    private router: Router,
    private Drawflow: Drawflow,
  ) { }

  ngOnInit(): void {
    //for integrating script into the drag component
    const s2 = this.renderer2.createElement('script');
    s2.type = 'text/javascript';
    s2.src = 'assets/drawflow_main_test.js';
    this.renderer2.appendChild(this._document.body, s2);

    // event listeners
    document.addEventListener('nodeCreated', () => {

    });
    document.addEventListener('filter_node_Created', (e: any) => {
      this.Drawflow.filter_node_created(e);
    });
    document.addEventListener('data_node_Created', (e: any) => {
      this.Drawflow.data_node_created(e);
    });
    document.addEventListener('output_node_Created', (e: any) => {
      this.Drawflow.output_node_created(e);
    });
    // document.addEventListener('set_join_obj', () => {
    //   this.Drawflow.set_join_obj();
    // });
    document.addEventListener('filter_node_selected', () => {
      this.router.navigateByUrl('/document/filter')
    });
    document.addEventListener('data_node_selected', () => {
      this.router.navigateByUrl('/document/data')
    });
    document.addEventListener('output_node_selected', () => {
      this.router.navigateByUrl('/document/join')
    });
    document.addEventListener('filter_node_deleted', () => {
      this.Drawflow.filter_node_deleted();
    });
    document.addEventListener('data_node_deleted', () => {
      this.Drawflow.data_node_deleted();
    });
    document.addEventListener('output_node_deleted', () => {
      this.Drawflow.output_node_deleted();
    });
    document.addEventListener('filter_data_connection_Created', () => {
      this.Drawflow.data_filter_connection_created();
    });
    document.addEventListener('filter_data_connection_removed', () => {
      this.Drawflow.data_filter_connection_removed();
    });
    document.addEventListener('data_output_connection_Created', () => {
      this.Drawflow.data_output_connection_created();
    });
    document.addEventListener('data_output_connection_removed', () => {
      this.Drawflow.data_output_connection_removed();
    });
    document.addEventListener('filter_output_connection_Created', () => {
      this.Drawflow.filter_output_connection_created();
    });
    document.addEventListener('filter_output_connection_removed', () => {
      this.Drawflow.filter_output_connection_removed();
    });

  }
  ngDoCheck(): void {

    //checking for sidebar status for full screen drag component
    this.side_bar_status = this.Required_functionalities.sidebar_status;
  }

  // [removed now]
  open_menu() {
    this.open_menu_status = !this.open_menu_status;
  }


  select_close() {
    this.open_menu_status = false;
  }

}
