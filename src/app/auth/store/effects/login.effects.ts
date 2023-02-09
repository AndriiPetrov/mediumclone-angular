import { AuthService } from './../../services/auth.service';
import { PersistanceService } from './../../../shared/services/persistance.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from '../actions/login.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap((action) => {
        return this.authService.login(action.request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        this.router.navigate(['']);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private persistanceService: PersistanceService,
    private authService: AuthService
  ) {}
}
