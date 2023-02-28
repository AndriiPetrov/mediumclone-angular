import { createAction, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const addToFavoritesAction = createAction(
  '[Add To Favorites] Add To Favoritess',
  props<{ isFavorited: boolean; slug: string }>()
);

export const addToFavoritesSuccessAction = createAction(
  '[Add To Favorites] Add To Favoritess Success',
  props<{ article: ArticleInterface }>()
);

export const addToFavoritesFailureAction = createAction(
  '[Add To Favorites] Add To Favoritess Failure'
);
