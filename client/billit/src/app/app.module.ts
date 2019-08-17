import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  NbThemeModule,
  NbSidebarModule,
  NbMenuModule,
  NbToastrModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpXsrfInterceptor, AuthInterceptor } from 'app/shared/interceptors';
import { CookieService } from 'ngx-cookie-service';
import { CsrfService, AuthService, BillService } from 'app/shared/services';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";
import { environment } from 'environments/environment';

/**
 * Google social login service configuration
 */
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleOAuthClientId)
  }
]);

/**
 * Function for adding Google social login in providers 
 */
export function provideConfig() {
  return config;
}

/**
 * Array of impprted modules
 */
const IMPORTED_MODULES = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  NbThemeModule.forRoot({ name: 'default' }),
  NbSidebarModule.forRoot(),
  NbMenuModule.forRoot(),
  NbToastrModule.forRoot(),
  NbEvaIconsModule,
  GraphQLModule,
  HttpClientModule,
  SocialLoginModule,
];

/**
 * Array of service providers
 */
const SETVICES = [
  CsrfService,
  CookieService,
  AuthService,
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  BillService
];

/**
 * Array of interceptors
 */
const INTERCEPTORS = [
  { 
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpXsrfInterceptor, 
    multi: true 
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...IMPORTED_MODULES
  ],
  providers: [
    ...SETVICES,
    ...INTERCEPTORS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private csrfService: CsrfService
  ) { 
    this.csrfService.getAuthCsrfToken();
    this.csrfService.getAppCsrfToken();
  }
}
