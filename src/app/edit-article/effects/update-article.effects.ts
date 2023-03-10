import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from '../actions/update-article.actions';
import { EditArticleService } from '../services/edit-article.service';

@Injectable()
export class UpdateArticleEffects {
  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ createArticle, slug }) => {
        return this.editArticleService.updateArticle(slug, createArticle).pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              updateArticleFailureAction({ errors: errorResponse.error.errors })
            )
          )
        );
      })
    )
  );

  redirectAfterUpdateArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}
}
