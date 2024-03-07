import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthFacade} from "@store/auth/auth.facade";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private authFacade: AuthFacade = inject(AuthFacade);
  ngOnInit(): void {
    this.authFacade.checkAuthStatus();
  }
}
