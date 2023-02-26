import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createArticleFeatureKey } from '../reducers/create-article.reducer';
import { CreateArticleStateInterface } from '../types/createArticleState.interface';

export const createArticleFeatureSelector =
  createFeatureSelector<CreateArticleStateInterface>(createArticleFeatureKey);

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors
);
