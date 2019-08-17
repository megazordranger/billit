import { Component, OnInit, Input } from '@angular/core';

/**
 * Container for view title
 */
@Component({
  selector: 'app-view-title',
  templateUrl: './view-title.component.html',
  styleUrls: ['./view-title.component.scss']
})
export class ViewTitleComponent implements OnInit {

  /**
   * Ttile string
   */
  @Input() public title: string;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
