import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

/**
 * Bill preview
 */
@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {

  /**
   * Variable for store bill data
   */
  public bill: any;

  /**
   * Bill data
   */
  @Input() row: any;

  /**
   * Injecting dependencie for modal manipulation
   */
  constructor(
    protected ref: NbDialogRef<PdfPreviewComponent>
  ) { }

  /**
   * Trigger the bill presentation data
   */
  ngOnInit() {
    this.setBill(this.row);
  }

  /**
   * Build bill data object
   */
  setBill({ id, customer, created_at, items }: any): void {
    
    let total = 0;
    let subTotal = 0;
    let totalTaxes = 0;

    items.forEach(({ price, tax, numberItems }) => {
      total = +(total + price * (tax/100 + 1) * numberItems).toFixed(2);
      subTotal = +(subTotal + price * numberItems).toFixed(2);
      totalTaxes = +(totalTaxes + price * (tax/100) * numberItems).toFixed(2);
    });
    
    if(id.length <= 4) {
      id = Array(4 - id.length).fill(0).join('') + id;
    }

    this.bill = {
      id, 
      customer, 
      created_at,
      items,
      total,
      subTotal,
      totalTaxes
    }
  }
}
