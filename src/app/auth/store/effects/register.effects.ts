import {PersistanceService} from './../../../shared/services/persistance.service'
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
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap((action) => {
        return this.authService.register(action.request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigate([''])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
