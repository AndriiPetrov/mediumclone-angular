import { createFeatureSelector, createSelector } from '@ngrx/store';
import { popularTagsFeatureKey } from './reducer';
import { PopularTagsStateInterface } from './types/populat-tags-state.interface';

export const popularTagsFeatureSelector =
  createFeatureSelector<PopularTagsStateInterface>(popularTagsFeatureKey);

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
);
export const isLoadingTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.isLoading
);
export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
);
