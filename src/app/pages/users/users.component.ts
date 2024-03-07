import {Component, inject, OnInit} from '@angular/core';
import {UsersFacade} from "@store/users/users.facade";
import {Observable} from "rxjs";
import {User} from "@shared/models/current-user.interface";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private usersFacade: UsersFacade = inject(UsersFacade);
  public users$: Observable<User[]> = this.usersFacade.users$;
  public isLoading$: Observable<boolean> = this.usersFacade.isLoading$;

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  public onLoadMore() {
    this.usersFacade.loadMore();
  }
}
