import {User} from "@shared/models/current-user.interface";

export interface UsersState {
  isLoading: boolean,
  users: User[],
}
