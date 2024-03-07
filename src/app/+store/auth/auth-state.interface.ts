import {User} from "@shared/models/current-user.interface";

export interface AuthState {
  isLoading: boolean,
  currentUser: User | null,
  isLoggedIn: boolean,
  isLoginFailed: boolean
}
