import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {authActions} from "./auth.actions";
import {SignUpRequest} from "@shared/models/signup-request.interface";
import {selectCurrentUser, selectIsLoading, selectIsLoggedIn, selectIsLoginFailed} from "@store/auth/auth.selectors";
import {Observable} from "rxjs";
import {LoginRequest} from "@shared/models/login-request.interface";
import {User} from "@shared/models/current-user.interface";

@Injectable(
  { providedIn: 'root'}
)
export class AuthFacade {
  private readonly store: Store = inject(Store);
  public isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  public isLoginFailed$: Observable<boolean> = this.store.select(selectIsLoginFailed);
  public isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  public currentUser$: Observable<User | null> = this.store.select(selectCurrentUser);

  public signup(userData: SignUpRequest): void {
    this.store.dispatch(authActions.signup({ userData }));
  }

  public login(userData: LoginRequest): void {
    this.store.dispatch(authActions.login({ userData }));
  }

  public logout(): void {
    this.store.dispatch(authActions.logout());
  }

  public checkAuthStatus(): void {
    this.store.dispatch(authActions.checkCurrentUserAuthStatus());
  }
}
