import {Actions, createEffect, FunctionalEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {AuthService} from "@core/services/auth.service";
import {authActions} from "@store/auth/auth.actions";
import {catchError, from, map, of, switchMap} from "rxjs";
import {User} from "@shared/models/current-user.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {LocalStorageService} from "@core/services/local-storage.service";

export const signup$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
    router: Router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ userData }) => {
        return authService.signupUser(userData)
          .pipe(
            map((user: User) => {
              router.navigateByUrl('ngrx/profile');
              return authActions.signupSuccess({ user });
            }),
            catchError((error: HttpErrorResponse) => {
              return of(authActions.signupFailure({ error: 'Signup Error!' }));
            })
          )
      })
    )
  },
  { functional: true }
);

export const login$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
    router: Router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ userData }) => {
        return authService.loginUser(userData)
          .pipe(
            map((user: User | null) => {
              if (user) {
                router.navigateByUrl('ngrx/profile');
                return authActions.loginSuccess({ user });
              } else {
                return authActions.loginFailure({ error: 'Login failed' });
              }
            }),
            catchError(error => {
              return of(authActions.loginFailure({ error: 'Login failed' }));
            })
          )
      })
    )
  },
  { functional: true }
);

export const logout$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    afAuth: AngularFireAuth = inject(AngularFireAuth),
    router: Router = inject(Router),
    localStorageService: LocalStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() => {
        return from(afAuth.signOut()).pipe(
          map((res) => {
            localStorageService.removeUser();
            router.navigateByUrl('/ngrx');
            return authActions.logoutSuccess();
          }),
          catchError((error) => {
            return of(authActions.logoutFailure({ error: 'Logout error!' }));
          })
        )
      })
    )
  },
  { functional: true }
);

export const checkCurrentUserAuthStatus$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    afAuth: AngularFireAuth = inject(AngularFireAuth),
    fireStore: AngularFirestore = inject(AngularFirestore),
    localStorageService: LocalStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(authActions.checkCurrentUserAuthStatus),
      switchMap(() => {
        const userExist: boolean = localStorageService.isCurrentUserLoggedIn();
        if (userExist) {
          const userData: User | null = localStorageService.loadUser();
          if (userData) {
            return of(authActions.checkCurrentUserAuthStatusSuccess({ user: userData }));
          }
        }

        return afAuth.authState.pipe(
          switchMap(user => {
            if (!user) return of(authActions.checkCurrentUserAuthStatusFailure());

            return fireStore.collection('users').doc<User>(user.uid).valueChanges().pipe(
              map((userData: User | undefined) => {
                if (userData) {
                  localStorageService.saveUser(userData);
                  return authActions.checkCurrentUserAuthStatusSuccess({ user: userData });
                } else {
                  return authActions.checkCurrentUserAuthStatusFailure();
                }
              }),
              catchError(() => of(authActions.checkCurrentUserAuthStatusFailure()))
            )
          })
        );
      }),
    )
  },
  { functional: true }
);
