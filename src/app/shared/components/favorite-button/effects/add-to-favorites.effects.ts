import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction,
} from '../actions/add-to-favorites.actions';
import { FavoriteButtonService } from '../services/favorite-button.service';

@Injectable()
export class AddToFavoritesEffects {
  actions$ = inject(Actions);
  addToFavoriteService = inject(FavoriteButtonService);

  addToFavoritesFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoriteService.removeFromFavorites(slug)
          : this.addToFavoriteService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({ article });
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction());
          })
        );
      })
    )
  );
}
