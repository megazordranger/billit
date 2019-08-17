import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  NbAuthModule, 
  NbAuthService,
  NbTokenService,
  NbTokenStorage,
  NbTokenLocalStorage,
  NbAuthTokenParceler,
  NbPasswordAuthStrategy,
  NbAuthJWTToken
} from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
  NbCardModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbSpinnerModule,
  NbListModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { TextMaskModule } from 'angular2-text-mask';
import { 
  PoliciesComponent, 
  TermAndConditionsComponent, 
  PrivacyPolicyComponent,
  DisclaimerComponent,
  CookiePolicyComponent
} from './policies/policies.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    PoliciesComponent,
    TermAndConditionsComponent,
    PrivacyPolicyComponent,
    DisclaimerComponent,
    CookiePolicyComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          }
        }),
      ],
      forms: {},
    }),
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbSpinnerModule,
    NbListModule,
    TextMaskModule
  ],
  providers: [
    HttpClient,
    NbAuthService,
    NbTokenService,
    { 
      provide: NbTokenStorage, 
      useClass: NbTokenLocalStorage 
    },
    NbAuthTokenParceler,
  ]
})
export class AuthModule { }
