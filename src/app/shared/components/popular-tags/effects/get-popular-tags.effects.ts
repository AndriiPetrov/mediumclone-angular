import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/pupular.type';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '../actions/get-popular-tags.actions';
import { PopularTagsService } from '../services/popula-tags.service';

@Injectable()
export class GetPopularTagsEffects {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({ popularTags });
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          })
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
