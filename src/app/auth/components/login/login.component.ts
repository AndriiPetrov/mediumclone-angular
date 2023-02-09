import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/login.actions';

@Component({
  selector: 'medium-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessagesComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: [''],
      password: '',
    });
  }

  onSubmit(): void {
    console.log(this.form.value);

    const request: LoginRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(loginAction({ request }));
  }
}
