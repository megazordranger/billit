import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route,	Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { AuthService } from 'app/shared/services';

/**
 * Only allow athenticated users in the protected routes
 */
@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {

  /**
   * @ignore
   */
  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  /**
   * Validation during loading
   */
  canLoad(route: Route): boolean {
    const url: string = route.path;
    if (this.authService.isLoggedIn()) {
	    return true; 
    }
    this.authService.setRedirectUrl(url);
    this.router.navigate([ this.authService.getAuthUrl() ]);
    return false;		
  }

  /**
   * Validation during activation
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
	  const url: string = state.url;
    if (this.authService.isLoggedIn()) {
      return true; 
    }
    this.authService.setRedirectUrl(url);
    this.router.navigate([ this.authService.getAuthUrl() ]);
      return false;
    }  	
} 