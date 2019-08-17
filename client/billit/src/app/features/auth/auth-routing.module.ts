import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { 
  PoliciesComponent, 
  TermAndConditionsComponent,
  PrivacyPolicyComponent,
  DisclaimerComponent,
  CookiePolicyComponent
} from './policies/policies.component';
import { NbAuthComponent } from '@nebular/auth';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'policies',
        component: PoliciesComponent,
        children: [
          {
            path: '',
            redirectTo: 'term-and-conditions',
            pathMatch: 'full',
          },
          {
            path: 'term-and-conditions',
            component: TermAndConditionsComponent,
          },
          {
            path: 'privacy-policy',
            component: PrivacyPolicyComponent,
          },
          {
            path: 'disclaimer',
            component: DisclaimerComponent,
          },
          {
            path: 'cookie-policy',
            component: CookiePolicyComponent,
          },
        ]
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
