import { createAction, props } from '@ngrx/store';
import { PopularTagType } from 'src/app/shared/types/pupular.type';
import { ActionsTypes } from '../store/actionTypes';

export const getPopularTagsAction = createAction(ActionsTypes.GET_POPULAR_TAGS);

export const getPopularTagsSuccessAction = createAction(
  ActionsTypes.GET_POPULAR_TAGS_SUCCESS,
  props<{ popularTags: PopularTagType[] }>()
);

export const getPopularTagsFailureAction = createAction(
  ActionsTypes.GET_POPULAR_TAGS_FAILURE
);
