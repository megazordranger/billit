import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { AuthGuard, LogoutGuard } from 'app/shared/guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    canLoad: [LogoutGuard],
    canActivate: [LogoutGuard],
  },
  {
      path: '',
      component: FeaturesComponent,
      canLoad: [AuthGuard],
      canActivate: [AuthGuard],
      children: [
        {
          path: 'dashboard',
          loadChildren: './dashboard/dashboard.module#DashboardModule',
        },
        {
          path: 'newbill',
          loadChildren: './newbill/newbill.module#NewbillModule',
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: '**', redirectTo: 'dashboard' },
      ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard, 
    LogoutGuard
  ]
})
export class FeaturesRoutingModule { }
