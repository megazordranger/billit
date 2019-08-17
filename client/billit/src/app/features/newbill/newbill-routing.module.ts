import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewbillComponent } from './newbill.component';

const routes: Routes = [
  {
    path: '',
    component: NewbillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewbillRoutingModule { }
