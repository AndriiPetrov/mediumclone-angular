import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { logoutAction } from '../actions/sync.actions';

@Injectable()
export class LogoutEffects {
  actions$ = inject(Actions);
  persistanceService = inject(PersistanceService);
  router = inject(Router);

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistanceService.set('accessToken', '');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
