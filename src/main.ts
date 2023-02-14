// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { isDevMode } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { APP_ROUTES } from './app/app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { RegisterEffects } from './app/auth/store/effects/register.effects';
import { GetCurrentUserEffects } from './app/auth/store/effects/get-current-user.effects';
import { authInterceptor } from './app/shared/services/auth-function.interceptor';
import { AuthInterceptor } from './app/shared/services/auth.interceptor';
import {
  feedReducer,
  feedReducerFeatureKey,
} from './app/shared/components/feed/store/reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err))

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    // provideState(feedReducerFeatureKey, feedReducer),
    provideState(authFeatureKey, authReducer),
    provideEffects([GetCurrentUserEffects]),
    provideHttpClient(
      withInterceptors([authInterceptor])
      // withInterceptorsFromDi()
    ),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      // autoPause: true,
      // trace: false,
      // traceLimit: 75,
    }),
  ],
}).catch((err) => console.error(err));
