import { createAction, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { SaveArticleRequest } from 'src/app/shared/types/saveArticleRequest.interface';

export const updateArticleAction = createAction(
  '[Edit Article] Update Articles',
  props<{ slug: string; createArticle: SaveArticleRequest }>()
);

export const updateArticleSuccessAction = createAction(
  '[Edit Article] Update Articles Success',
  props<{ article: ArticleInterface }>()
);

export const updateArticleFailureAction = createAction(
  '[Edit Article] Update Articles Failure',
  props<{ errors: BackendErrorsInterface }>()
);
