import { Injectable } from '@angular/core';
import { formatNumber } from '@angular/common';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';

/**
 * Print bill pdf service
 */
@Injectable()
export class BillPdfService {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Print bill pdf
   */
  print({ id, customer, created_at, items }) {

    const date = moment(new Date(created_at)).format("DD/MM/YYYY");
    const logo = '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';

    let total: any = 0;
    let subTotal: any = 0;
    let totalTaxes: any = 0;
    let totalItems: any = 0;

    items.forEach(({ name, price, tax, numberItems, totalItem }, i) => {
      total = +(total + price * (tax/100 + 1) * numberItems).toFixed(2);
      subTotal = +(subTotal + price * numberItems).toFixed(2);
      totalTaxes = +(totalTaxes + price * (tax/100) * numberItems).toFixed(2);
      totalItems += numberItems;

      items[i] = {
        id: i+1,
        name,
        price: `$ ${formatNumber(price, 'es')}`,
        tax: `% ${formatNumber(tax, 'es')}`,
        numberItems,
        total: `$ ${formatNumber(totalItem, 'es')}`,
      }
    });

    total = '$ ' + formatNumber(total, 'es');
    subTotal = '$ ' +  formatNumber(subTotal, 'es');
    totalTaxes = '$ ' +  formatNumber(totalTaxes, 'es');

    const doc = new jsPDF();

    doc.deletePage(1);
    doc.addPage('A5', 'l');
    doc.addImage(logo, 'png', 15, 0);

    doc.text('Invoice #:', 15, 50);
    doc.text(id, 50, 50);
    doc.text('Created:', 15, 60);
    doc.text(date, 50, 60);
    doc.text('Customer:', 15, 70);
    doc.text(customer, 50, 70);

    doc.text('Total items:', 15, 100);
    doc.text(totalItems.toString(), 50, 100);
    doc.text('Sub Total:', 15, 110);
    doc.text(subTotal, 50, 110);
    doc.text('Total Taxes:', 15, 120);
    doc.text(totalTaxes, 50, 120);
    doc.text('Total:', 15, 130);
    doc.text(total, 50, 130);

    doc.addPage('A4');

    doc.autoTable({ 
      columns: [
        { header: '#', dataKey: 'id' },
        { header: 'Name', dataKey: 'name' },
        { header: 'Price', dataKey: 'price' },
        { header: 'Tax', dataKey: 'tax' },
        { header: 'Number of items', dataKey: 'numberItems' },
        { header: 'Total item', dataKey: 'total' },
      ],
      body: items
    });

    doc.save(`Invoice_${id}.pdf`);
  }
}