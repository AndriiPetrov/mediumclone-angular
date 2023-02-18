import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getArticleFeatureKey } from '../reducers/get-article.reducer';
import { ArticleStateInterface } from '../types/articleState.interface';

export const articleFeatureSelector =
  createFeatureSelector<ArticleStateInterface>(getArticleFeatureKey);

export const isLoadingSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.isLoading
);

export const articleSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.data
);

export const errorSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.error
);
