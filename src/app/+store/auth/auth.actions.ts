import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {SignUpRequest} from "@shared/models/signup-request.interface";
import {LoginRequest} from "@shared/models/login-request.interface";
import {User} from "@shared/models/current-user.interface";

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    signup: props<{ userData: SignUpRequest }>(),
    signupSuccess: props<{ user: User }>(),
    signupFailure: props<{ error: string }>(),

    login: props<{ userData: LoginRequest }>(),
    loginSuccess: props<{ user: User }>(),
    loginFailure: props<{ error: string }>(),

    logout: emptyProps(),
    logoutSuccess: emptyProps(),
    logoutFailure: props<{ error: string }>(),

    checkCurrentUserAuthStatus: emptyProps(),
    checkCurrentUserAuthStatusSuccess: props<{ user: User }>(),
    checkCurrentUserAuthStatusFailure: emptyProps()
  }
})
