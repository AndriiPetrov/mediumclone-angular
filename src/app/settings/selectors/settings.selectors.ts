import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey } from '../reducers/settings.reducer';
import { SettingsStateInterface } from '../types/settingsState.interace';

export const settingsFeatureSelector =
  createFeatureSelector<SettingsStateInterface>(settingsFeatureKey);

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface): boolean => settingsState.isSubmitting
);
export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface) => settingsState.validationErrors
);
