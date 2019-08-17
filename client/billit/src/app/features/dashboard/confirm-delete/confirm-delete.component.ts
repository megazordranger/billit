import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

/**
 * Modal for delete row confirmation
 */
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  /**
   * Get selected row id
   */
  @Input() id: any;

  /**
   * Injecting dependencie for modal manipulation
   */
  constructor(
    protected ref: NbDialogRef<ConfirmDeleteComponent>
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * Calcel deleting and close modal
   */
  cancel() {
    this.ref.close();
  }

  /**
   * Send true for deleting and close modal
   */
  delete() {
    this.ref.close(true);
  }

}
