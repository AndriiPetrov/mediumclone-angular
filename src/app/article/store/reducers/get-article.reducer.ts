import { routerNavigationAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/get-article.actions';
import { ArticleStateInterface } from '../types/articleState.interface';

export const getArticleFeatureKey = 'article';

export const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): ArticleStateInterface => initialState)
);
