import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'environments/environment';
import { onError } from 'apollo-link-error';
import { AuthService } from 'app/shared/services';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    authService: AuthService
  ) {

    const errorLink = onError(({ networkError }) => {    
      if (networkError) {
        console.log(`[Network error]: `, networkError);

        const { error: { errors } }: any = networkError;

        errors.forEach(err => {
          const { extensions: { code } } = err;
          if(code === 'UNAUTHENTICATED') authService.logout();
        });
      } 
    });

    const appHttp = httpLink.create({ 
      uri: environment.appUrl,
      withCredentials: true
    });
    const authHttp = httpLink.create({ 
      uri: environment.authUrl,
      withCredentials: true,
    });

    const defaultOptions: any = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }

    apollo.createDefault({
      link: errorLink.concat(appHttp),
      cache: new InMemoryCache(),
      defaultOptions
    });

    apollo.create({
      link: errorLink.concat(authHttp),
      cache: new InMemoryCache(),
      defaultOptions
    }, 'auth');
  }
}