// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import {bootstrapApplication} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {provideRouter, Routes} from '@angular/router'
import {RegisterComponent} from './app/auth/components/register/register.component'

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err))

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
]

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err))
