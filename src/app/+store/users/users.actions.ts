import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "@shared/models/current-user.interface";

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailure: props<{ error: string }>(),

    clearUser: emptyProps()
  }
})
