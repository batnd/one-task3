import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthFacade} from "@store/auth/auth.facade";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private authFacade: AuthFacade = inject(AuthFacade);
  public isLoginFailed$: Observable<boolean> = this.authFacade.isLoginFailed$;
  public isLoading$: Observable<boolean> = this.authFacade.isLoading$;
  private fb: FormBuilder = inject(FormBuilder);
  public formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
    password: ['', [Validators.required]],
  });

  public get formControls() {
    return this.formLogin.controls;
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      // this.authService.loginUser(this.formLogin.value).subscribe(res => console.log(res));
      this.authFacade.login(this.formLogin.value);
    }
  }
}
