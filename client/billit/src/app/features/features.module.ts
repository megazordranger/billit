import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { UserPopoverComponent } from './user-popover/user-popover.component';
import { 
  NbLayoutModule, 
  NbUserModule, 
  NbCardModule, 
  NbPopoverModule,
  NbSidebarModule,
  NbMenuModule,
  NbIconModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AuthService } from 'app/shared/services'
import { AuthService as SocialAuthService, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";
import { environment } from 'environments/environment';

/**
 * Google social login configuration
 */
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleOAuthClientId)
  }
]);

/**
 * Prepare provider for social login configuration
 */
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    FeaturesComponent,
    UserPopoverComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    NbLayoutModule,
    NbUserModule,
    NbCardModule,
    NbPopoverModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule
  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    SocialAuthService
  ],
  entryComponents: [
    UserPopoverComponent
  ]
})
export class FeaturesModule { }
