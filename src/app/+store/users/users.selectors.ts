import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Users_Feature_Key} from "@store/users/users.reducers";
import {UsersState} from "@store/users/users-state.interface";

export const selectUsersFeature = createFeatureSelector<UsersState>(Users_Feature_Key);

export const selectIsLoading = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.isLoading
);

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);
