import {Actions, createEffect, FunctionalEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {UsersService} from "@core/services/users.service";
import {catchError, map, of, switchMap} from "rxjs";
import {usersActions} from "@store/users/users.actions";
import {authActions} from "@store/auth/auth.actions";

export const loadUsers$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    usersService: UsersService = inject(UsersService)
  ) => {
    return actions$.pipe(
      ofType(usersActions.loadUsers),
      switchMap(() => {
        return usersService.loadUsers().pipe(
          map(users => {
            return usersActions.loadUsersSuccess({ users });
          }),
          catchError((error) => {
            return of(usersActions.loadUsersFailure({ error: 'Error when loading users' }));
          })
        )
      })
    )
  },
  { functional: true }
);

export const clearUsers$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions)
  ) => {
    return actions$.pipe(
      ofType(authActions.logoutSuccess),
      switchMap(() => {
        return of(usersActions.clearUser());
      })
    )
  },
  { functional: true }
)
