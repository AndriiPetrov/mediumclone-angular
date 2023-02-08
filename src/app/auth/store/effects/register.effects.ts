import {CurrentUserInterface} from './../../../shared/types/currentUser.interface'
import {AuthService} from './../../services/auth.service'
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from './../actions/register.action'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      tap((test) => console.log(test)),
      switchMap((action) => {
        return this.authService.register(action.request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({currentUser})
          }),
          catchError(() => {
            return of(registerFailureAction())
          })
        )
      })
    )
  )
  constructor(private actions$: Actions, private authService: AuthService) {}
}
