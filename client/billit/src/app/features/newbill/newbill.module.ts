import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { TextMaskModule } from 'angular2-text-mask';
import { SharedComponentsModule } from 'app/shared/components/components.module';
import { MiscFunctionsService, ShowErrorService } from 'app/shared/services';

import { NewbillRoutingModule } from './newbill-routing.module';
import { NewbillComponent } from './newbill.component';

@NgModule({
  declarations: [
    NewbillComponent
  ],
  imports: [
    CommonModule,
    NewbillRoutingModule,
    SharedComponentsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [
    MiscFunctionsService,
    ShowErrorService
  ]
})
export class NewbillModule { }
