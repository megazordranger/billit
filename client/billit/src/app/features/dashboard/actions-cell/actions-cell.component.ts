import { Component, Input,  OnInit, Output, EventEmitter } from '@angular/core';

/**
 * Container for action buttons in the dashboard table
 */
@Component({
  selector: 'app-actions-cell',
  templateUrl: './actions-cell.component.html',
  styleUrls: ['./actions-cell.component.scss']
})
export class ActionsCellComponent implements OnInit {

  /**
   * Selected row data
   */
  @Input() rowData: any;
  /**
   * Selected cell data
   */
  @Input() value: any;

  /**
   * Event emitter for send action selected
   */
  @Output() 
  action = new EventEmitter<any>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * Method for trigger event emitter 
   * send action selected and row afected
   *
   * @param {*} action
   */
  onAction(action) {
    this.action.emit({
      action,
      row: this.rowData
    });
  }

}
