import { Component, Input,  OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

/**
 * Container for total billed
 */
@Component({
  selector: 'app-billed-cell',
  templateUrl: './billed-cell.component.html',
  styleUrls: ['./billed-cell.component.scss']
})
export class BilledCellComponent implements ViewCell, OnInit {

  /**
   * Variable for save the total billed
   */
  renderValue: number;

  /**
   * Selected row data
   */
  @Input() rowData: any;
  /**
   * Selected cell data
   */
  @Input() value: any;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Calculate the total billed
   */
  ngOnInit() {

    let total = 0;

    this.value.forEach(({ price, tax, numberItems }) => {
      total = +(total + price * (tax/100 + 1) * numberItems).toFixed(2);
    });

    this.renderValue = total;
  }

}
