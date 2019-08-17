import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { BillService, BillPdfService, ShowErrorService, MiscFunctionsService } from 'app/shared/services';
import { BilledCellComponent } from './billed-cell/billed-cell.component';
import { ActionsCellComponent } from './actions-cell/actions-cell.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import * as moment from 'moment';

/**
 * Main view component,
 * show all user bills and allow diferent actions: 
 * 
 * * Delete
 * * Preview
 * * Print 
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * Variable for hide/show loading in submit button form,
   * deafult value us false (loading hide)
   */
  public loading: boolean = false;
  /**
   * Declaring store variable for smart table data
   */
  source: LocalDataSource;

  /**
   * Handler for action event emitter from ActionsCellComponent in the smart table
   */
  actionHandler = instance => {
    instance.action.subscribe(({ action, row }) => {
      switch(action){
        case 'delete':
          this.deleteRecord(row);
          break;
        case 'preview':
          this.pdfPreview(row);
          break;
        case 'print':
          this.pdfPrint(row);
          break;
      }
    });
  }

  /**
   * Configuration for smart table
   */
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'Bill #',
        type:'html',
        valuePrepareFunction:(cell, row)=>{
          if(row.id.length <= 4) {
            row.id = Array(4 - row.id.length).fill(0).join('') + row.id;
          }
          return row.id;
        },
        filter: false
      },
      customer: {
        title: 'Customer',
        filter: false
      },
      created_at: {
        title: 'Created',
        type:'html',
        valuePrepareFunction:(cell, row)=>{
          return moment(row.created_at).format("DD/MM/YYYY"); 
        },
        filter: false
      },
      items: {
        title: 'Total billed',
        filter: false,
        type: 'custom',
        renderComponent: BilledCellComponent
      },
      actions: 
      {
        title:'Actions',
        type:'custom',
        renderComponent: ActionsCellComponent,
        onComponentInitFunction: this.actionHandler,
        filter:false       
      },
    }
  };
  
  /**
   * Injecting dependencies and initializing store variable for smart table data
   */
  constructor(
    private billService: BillService,
    private billPdfService: BillPdfService,
    private dialogService: NbDialogService,
    private errorService: ShowErrorService,
    private miscFuncService:  MiscFunctionsService
  ) {
    this.source = new LocalDataSource();
  }

  /**
   * Get user bills data and passing it to smart table
   */
  ngOnInit() {

    this.showLoader();
    this.billService.getBills()
      .subscribe(({ data, errors }) => {
        
        this.hideLoader();
        if(errors) {
          console.log(errors);
          this.errorService.show(errors);
        }
          
        if(data) {
          const { bills } = data as any;
          this.source.empty().then(() => {
            this.source.load(bills);
          }); 
        }
        
      }, error => {
        this.hideLoader();
        this.errorService.showDefault();
        console.log(error)
      });
  }

  /**
   * Show load spinner
   */
  showLoader() {
    this.loading = true;
  }

  /**
   * Hide load spinner
   */
  hideLoader() {
    this.loading = false;
  }

  /**
   * Delete selected bill
   */
  deleteRecord(row) {
    this.dialogService.open(ConfirmDeleteComponent, { context: { id: row.id } })
      .onClose.subscribe(del => {
        if(!del) return;
        
        this.showLoader();
        this.billService.deleteBill(row.id)
          .subscribe(({ data, errors }) => {

            this.hideLoader();
            if(errors) {
              console.log(errors);
              this.errorService.show(errors);
            }

            const { billDelete } = data;
            if(billDelete) {
              this.source.remove(row);
            } 

          }, error => { 
            this.hideLoader();
            this.errorService.showDefault();
            console.log(error)
          });
      });
  }

  /**
   * Selected bill preview
   */
  pdfPreview(row) {
    this.dialogService.open(PdfPreviewComponent, { context: { row } });
  }

  /**
   * Print selected bill
   */
  pdfPrint(row) {
    const newRow: any = this.miscFuncService.copyObj(row);
    this.billPdfService.print(newRow);
  }
}
