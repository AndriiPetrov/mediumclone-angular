import {provideState} from '@ngrx/store'
import {Routes} from '@angular/router'

import {RegisterComponent} from './auth/components/register/register.component'
import {authFeatureKey, authReducer} from './auth/store/reducers'

export const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    // providers: [provideState(authFeatureKey, authReducer)],
  },
]
