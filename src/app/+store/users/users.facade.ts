import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {usersActions} from "@store/users/users.actions";
import {selectIsLoading, selectUsers} from "@store/users/users.selectors";
import {Observable} from "rxjs";
import {User} from "@shared/models/current-user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  private readonly store: Store = inject(Store);
  public users$: Observable<User[]> = this.store.select(selectUsers);
  public isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  public loadUsers(): void {
    this.store.dispatch(usersActions.loadUsers());
  }
  public loadMore(): void {
    this.store.dispatch(usersActions.loadUsers());
  }
}
