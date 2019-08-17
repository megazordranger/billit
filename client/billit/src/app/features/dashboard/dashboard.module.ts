import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NbCardModule, 
  NbButtonModule,
  NbDialogModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from 'app/shared/components/components.module';
import { BillPdfService, ShowErrorService, MiscFunctionsService } from 'app/shared/services';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BilledCellComponent } from './billed-cell/billed-cell.component';
import { ActionsCellComponent } from './actions-cell/actions-cell.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    BilledCellComponent, 
    ActionsCellComponent, 
    PdfPreviewComponent, 
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    SharedComponentsModule,
    NbSpinnerModule,
  ],
  providers: [
    BillPdfService,
    ShowErrorService,
    MiscFunctionsService
  ],
  entryComponents: [
    BilledCellComponent,
    ActionsCellComponent,
    PdfPreviewComponent,
    ConfirmDeleteComponent
  ]
})
export class DashboardModule { }
