import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthFacade} from "@store/auth/auth.facade";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authFacade: AuthFacade = inject(AuthFacade);
  public isLoggedIn$: Observable<Boolean> = this.authFacade.isLoggedIn$;

  public logout(): void {
    this.authFacade.logout();
  }
}
