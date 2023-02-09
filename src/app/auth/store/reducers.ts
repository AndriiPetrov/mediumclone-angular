import {createReducer, on} from '@ngrx/store'
import {AuthStateInterface} from '../types/authState.interface'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
}

export const authFeatureKey = 'auth'

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(registerSuccessAction, (state, {currentUser}) => {
    return {
      ...state,
      currentUser: currentUser,
      isLoggedIn: true,
      isSubmitting: false,
    }
  }),
  // on(registerSuccessAction, (state, action) => {
  //   return {
  //     ...state,
  //     currentUser: action.currentUser,
  //     isLoggedIn: true,
  //     isSubmitting: false,
  //   }
  // }),
  on(registerFailureAction, (state, {errors}) => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    }
  })
)
