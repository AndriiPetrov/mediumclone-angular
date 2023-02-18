import { Action, createReducer, on } from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from './actions/get-popular-tags.actions';
import { PopularTagsStateInterface } from './types/populat-tags-state.interface';

export const popularTagsFeatureKey = 'popularTags';

export const initialState: PopularTagsStateInterface = {
  data: null,
  error: null,
  isLoading: false,
};

export const popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state: PopularTagsStateInterface) => ({
    ...state,
    isLoading: true,
  })),
  on(getPopularTagsSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.popularTags,
  })),
  on(getPopularTagsFailureAction, (state) => ({
    ...state,
    isLoading: false,
  }))
);
