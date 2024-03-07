import {UsersState} from "./users-state.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {usersActions} from "@store/users/users.actions";

export const Users_Feature_Key: string = 'Users';

const initialState: UsersState = {
  users: [],
  isLoading: false,
}

export const usersFeature = createFeature({
  name: Users_Feature_Key,
  reducer: createReducer(
    initialState,
    on(usersActions.loadUsers, (state: UsersState) => ({
      ...state,
      isLoading: true
    })),
    on(usersActions.loadUsersSuccess, (state: UsersState, { users}) => ({
      ...state,
      users,
      isLoading: false
    })),
    on(usersActions.loadUsersFailure, (state: UsersState) => ({
      ...state,
      isLoading: false
    })),
    on(usersActions.clearUser, (state: UsersState) => ({
      ...state,
      users: [],
      isLoading: false
    }))
  )
})
