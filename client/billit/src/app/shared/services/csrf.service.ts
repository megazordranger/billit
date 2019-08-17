import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

/**
 * Get csrf tokens
 */
@Injectable()
export class CsrfService {

    /**
     * Url for authentication server
     */
    private hostAuthUrl: string = environment.hostAuthUrl;
    /**
     * Url for application server server
     */
    private hostAppUrl: string = environment.hostAppUrl;

    /**
     * @ignore
     */
    constructor(
        private http: HttpClient, 
    ) { }

    /**
     * Get csrf token for authentication server
     */
    getAuthCsrfToken(): void {
        this.http.get(`${this.hostAuthUrl}/`, { withCredentials: true })
            .subscribe(resp => {
                // console.log('authCsrf', resp);
            });
    }

    /**
     * Get csrf token for application server
     */
    getAppCsrfToken(): void {
        this.http.get(`${this.hostAppUrl}/`, { withCredentials: true })
            .subscribe(resp => {
                // console.log('appCsrf', resp);
            });
    }

}