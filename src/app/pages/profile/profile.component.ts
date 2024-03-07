import {Component, inject} from '@angular/core';
import {AuthFacade} from "@store/auth/auth.facade";
import {Observable} from "rxjs";
import {User} from "@shared/models/current-user.interface";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private authFacade: AuthFacade = inject(AuthFacade);
  public currentUser$: Observable<User | null> = this.authFacade.currentUser$;
}
