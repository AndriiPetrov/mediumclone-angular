import { createReducer, on } from '@ngrx/store';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/update-current-user';
import { SettingsStateInterface } from '../types/settingsState.interace';

export const settingsFeatureKey = 'settings';

export const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

export const settingsReducer = createReducer(
  initialState,
  on(
    updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
);
