import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Auth_Feature_Key} from "@store/auth/auth.reducers";
import {AuthState} from "@store/auth/auth-state.interface";

export const selectAuthFeature = createFeatureSelector<AuthState>(Auth_Feature_Key);

export const selectIsLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoading
);

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoggedIn
);
export const selectIsLoginFailed = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoginFailed
);

export const selectCurrentUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.currentUser
);
