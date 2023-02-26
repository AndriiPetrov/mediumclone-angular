import { createAction, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const getArticleAction = createAction(
  '[Edit Article] Get Article',
  props<{ slug: string }>()
);

export const getArticleSuccessAction = createAction(
  '[Edit Article] Get Article Success',
  props<{ article: ArticleInterface }>()
);

export const getArticleFailureAction = createAction(
  '[Edit Article] Get Article Failure'
);
