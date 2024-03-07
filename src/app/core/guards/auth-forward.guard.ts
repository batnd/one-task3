import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {select, Store} from "@ngrx/store";
import {inject} from "@angular/core";
import {map, take, withLatestFrom} from "rxjs";
import {selectIsLoggedIn} from "@store/auth/auth.selectors";

export const authForwardGuard: CanActivateFn = (route, state) => {
  const store: Store = inject(Store);
  const router: Router = inject(Router);

  return store.pipe(
    select(selectIsLoggedIn),
    map((isLoggedIn: boolean): UrlTree | boolean => {
      if (isLoggedIn) return router.createUrlTree(['/ngrx']);
      else return true;
    }),
    take(1)
  );
};
