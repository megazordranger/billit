import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';

/**
 * Intercept all http request for add csrf token header
 */
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  /**
   * @ignore
   */
  constructor(
    private cookieService: CookieService
  ) { }

  /**
   * If http request point to auth/app server add respective csrf token
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headerName = 'X-XSRF-TOKEN';
    const cookieName = req.url === environment.authUrl 
      ? 'XSRF-AUTH-TOKEN' : req.url === environment.appUrl 
        ? 'XSRF-APP-TOKEN' : null;

    if(cookieName) {
      const token = this.cookieService.get(cookieName);
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
       
    return next.handle(req);
  }
}