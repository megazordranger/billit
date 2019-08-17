import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router  } from '@angular/router';
import { AuthService } from 'app/shared/services'

/**
 * Intercept all http response for look unauthorized error
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * @ignore
   */
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * If the status response is 401 (unauthorized error) trigger logout
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          this.authService.logout();
        }
      }
    }));
  }
}
      