import {Component, inject} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthFacade} from "@store/auth/auth.facade";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private authFacade: AuthFacade = inject(AuthFacade);
  private authService: AuthService = inject(AuthService);
  public isLoading$: Observable<boolean> = this.authFacade.isLoading$;
  private fb: FormBuilder = inject(FormBuilder);
  public formSignup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
    password: ['', [Validators.required]],
  });

  public get formControls() {
    return this.formSignup.controls;
  }

  public onSubmit(): void {
    if (this.formSignup.valid) {
      this.authFacade.signup(this.formSignup.value);
    }
  }
}
