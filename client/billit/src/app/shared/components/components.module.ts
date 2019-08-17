import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { ViewTitleComponent } from './view-title/view-title.component';

@NgModule({
  declarations: [
    ViewTitleComponent
  ],
  imports: [
    CommonModule,
    NbCardModule
  ],
  exports: [
    ViewTitleComponent
  ],
})
export class SharedComponentsModule { }
