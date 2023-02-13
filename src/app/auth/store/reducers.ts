import { createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/get-current-user.actions';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.actions';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(registerSuccessAction, loginSuccessAction, (state, { currentUser }) => {
    return {
      ...state,
      currentUser: currentUser,
      isLoggedIn: true,
      isSubmitting: false,
    };
  }),
  // on(registerSuccessAction, (state, action) => {
  //   return {
  //     ...state,
  //     currentUser: action.currentUser,
  //     isLoggedIn: true,
  //     isSubmitting: false,
  //   }
  // }),
  on(registerFailureAction, loginFailureAction, (state, { errors }) => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    };
  }),
  // on(loginAction, (state): AuthStateInterface => {
  //   return {
  //     ...state,
  //     isSubmitting: true,
  //     validationErrors: null,
  //   };
  // }),
  // on(loginSuccessAction, (state, action): AuthStateInterface => {
  //   return {
  //     ...state,
  //     currentUser: action.currentUser,
  //     isLoggedIn: true,
  //     isSubmitting: false,
  //   };
  // }),
  // on(loginFailureAction, (state, action) => {
  //   return {
  //     ...state,
  //     isSubmitting: false,
  //     validationErrors: action.errors,
  //   };
  // })
  on(getCurrentUserAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getCurrentUserSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
  })),
  on(getCurrentUserFailureAction, (state) => ({
    ...state,
    isLoggedIn: false,
    isLoading: false,
    currentUser: null,
  }))
);
