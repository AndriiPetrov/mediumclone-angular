import { createFeatureSelector, createSelector } from '@ngrx/store';
import { editArticleFeatureKey } from '../reducers/edit-article.reducer';
import { EditArticleStateInterface } from '../types/edit-article-state.interface';

export const editArticleFeatureSelector =
  createFeatureSelector<EditArticleStateInterface>(editArticleFeatureKey);

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting
);

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
);

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.validationErrors
);

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article
);
