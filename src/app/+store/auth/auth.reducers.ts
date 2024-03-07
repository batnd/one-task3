import {AuthState} from "./auth-state.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {authActions} from "./auth.actions";

export const Auth_Feature_Key: string = 'Auth';

const initialState: AuthState = {
  isLoading: false,
  currentUser: null,
  isLoggedIn: false,
  isLoginFailed: false
};

export const authFeature = createFeature({
  name: Auth_Feature_Key,
  reducer: createReducer(
    initialState,
    on(authActions.signup, (state: AuthState) => ({
      ...state,
      isLoading: true
    })),
    on(authActions.signupSuccess, (state: AuthState, { user }) => ({
      ...state,
      currentUser: user,
      isLoading: false,
      isLoggedIn: true
    })),
    on(authActions.signupFailure, (state: AuthState, { error }) => ({
      ...state,
      isLoading: false,
      isLoggedIn: false
    })),
    on(authActions.login, (state: AuthState) => ({
      ...state,
      isLoading: true,
      isLoginFailed: false
    })),
    on(authActions.loginSuccess, (state: AuthState, { user }) => ({
      ...state,
      currentUser: user,
      isLoading: false,
      isLoggedIn: true,
      isLoginFailed: false
    })),
    on(authActions.loginFailure, (state: AuthState, { error }) => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      isLoginFailed: true
    })),
    on(authActions.logoutSuccess, (state: AuthState) => ({
      ...state,
      currentUser: null,
      isLoggedIn: false
    })),
    on(authActions.checkCurrentUserAuthStatusSuccess, (state: AuthState, { user }) => ({
      ...state,
      currentUser: user,
      isLoggedIn: true
    })),
    on(authActions.checkCurrentUserAuthStatusFailure, (state: AuthState) => ({
      ...state,
      currentUser: null,
      isLoggedIn: false,
      isLoading: false
    }))
  )
})
