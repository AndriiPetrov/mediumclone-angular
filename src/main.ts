// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { isDevMode } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { appRoutes } from './app/app-routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { RegisterEffects } from './app/auth/store/effects/register.effects';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err))

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    // provideEffects(RegisterEffects),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      // autoPause: true,
      // trace: false,
      // traceLimit: 75,
    }),
  ],
}).catch((err) => console.error(err));
