import {provideState} from '@ngrx/store'
import {Routes} from '@angular/router'

import {RegisterComponent} from './auth/components/register/register.component'
import {authFeatureKey, authReducer} from './auth/store/reducers'
import {provideEffects} from '@ngrx/effects'
import {RegisterEffects} from './auth/store/effects/register.effects'

export const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    providers: [provideEffects(RegisterEffects)],
    // providers: [provideState(authFeatureKey, authReducer)],
  },
]
