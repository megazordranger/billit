import { Injectable, NgZone } from '@angular/core';
import { Router  } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User, SocialLoginRequest, RegisterRequest, LoginRequest } from 'app/shared/models';
import * as moment from "moment";
import { AuthService as SocialAuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";

/**
 * Authentication service
 */
@Injectable()
export class AuthService {
 
    /**
     * Path to authentication views
     */
    private authUrl: string = '/auth';
    /**
     * Root path
     */
    private redirectUrl: string = '/';
    /**
     * User data store variable
     */
    private user: User;
    /**
     * User data from social login store variable
     */
    private socialUser: SocialUser;

    /**
     * Injecting dependencies and subscribing the social login service
     */
    constructor(
        private apollo: Apollo,  
        private router: Router,
        private socialAuthService: SocialAuthService,
        private ngZone: NgZone
    ) { 
        this.socialAuthService.authState.subscribe((user) => {
            if(this.isLoggedIn() || !user) return;
            
            this.socialUser = user;
            this.socialLogin({
                username: user.firstName,
                email: user.email
            });
        });
    }

    /**
     * Resgistration method
     */
    register(user: RegisterRequest){

        const registerMutation = gql`
            mutation signUp($input: UserInput!){
                signUp (
                    input: $input
                ) {
                    id
                    username
                    email
                    expiresIn
                }
            }
        `;

        return new Promise ((resolve, reject) => {
            this.apollo.use('auth').mutate({
                mutation: registerMutation,
                variables: {
                    input: user
                }
            })
            .subscribe(({ data, errors }) => {

                if(data){
                    const { signUp } = data;
                    this.setSession(signUp);
                    resolve(true);
                } else 
                    resolve(errors);
                
            }, error => reject(error));
        });
    }

    /**
     * Login method
     */
    login(login: LoginRequest){

        const loginMutation = gql`
            mutation signIn($input: LoginInput!){
                signIn (
                    input: $input
                ) {
                    id
                    username
                    email
                    expiresIn
                }
            }
        `;

        return new Promise ((resolve, reject) => {
            this.apollo.use('auth').mutate({
                mutation: loginMutation,
                variables: {
                    input: login
                }
            })
            .subscribe(({ data, errors }) => {

                if(data){
                    const { signIn } = data;
                    this.setSession(signIn);
                    resolve(true);
                } else 
                    resolve(errors);
                
            }, error => reject(error));
        });
    }

    /**
     * Social login method
     */
    socialLogin(user: SocialLoginRequest){

        const socialLoginMutation = gql`
            mutation socialSignIn($input: SocialInput!){
                socialSignIn (
                    input: $input
                ) {
                    id
                    username
                    email
                    expiresIn
                }
            }
        `;

        this.apollo.use('auth').mutate({
            mutation: socialLoginMutation,
            variables: {
                input: user
            }
        })
        .subscribe(({ data, errors }) => {

            if(data){
                const { socialSignIn } = data;
                this.setSession(socialSignIn);
            } else 
                console.log(errors);
            
        }, error => console.log(error));
    }

    /**
     * Method fro trigger social login with google
     */
    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    
    /**
     * Logout method
     */
    logout(): void {
        const signOutMutation = gql`
            mutation {
                signOut
            }
        `;

        this.apollo.use('auth').mutate({
            mutation: signOutMutation
        })
        .subscribe(({ data, errors }) => {

            if(data){
                const { signOut } = data;
                if(signOut) {
                    localStorage.removeItem("expires_at");
                    this.ngZone.run(() => this.router.navigateByUrl('/auth')).then();
                    this.socialAuthService.signOut();
                }
            } else 
                console.log(errors);    

        }, error => console.log(error));
    }

    /**
     * Method for initializing method
     */
    private setSession({ expiresIn, ...user }) {

        const expiresAt = moment().add(expiresIn,'second');
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        this.user = user as User;
        this.router.navigateByUrl('/');

        const mutation = gql`
            mutation {
                login {
                    id
                    username
                    email
                }
            }
        `;

        this.apollo.mutate({ mutation })
        .subscribe(({ data, errors }) => {     
            if(errors) console.log(errors);     
        }, error => console.log(error));
    }
    
    /**
     * Return true if user is logged
     */
    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    /**
     * Return true if user is not logged
     */
    isLoggedOut() {
        return !this.isLoggedIn();
    }

    /**
     * Get the session expiration time 
     */
    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    } 

    /**
     * Get last redirection path (only used in guards service)
     */
    getRedirectUrl(): string {
		return this.redirectUrl;
    }

    /**
     * Store last redirection path (only used in guards service)
     */
    setRedirectUrl(url: string): void {
		this.redirectUrl = url;
	}

    /**
     * Get authentication view path
     */
    getAuthUrl(): string {
		return this.authUrl;
    }       
}