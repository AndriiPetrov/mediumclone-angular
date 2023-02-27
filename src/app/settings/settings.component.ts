import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { filter, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from '../auth/store/selectors';
import { BackendErrorsInterface } from '../shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from './selectors/settings.selectors';
import { BackendErrorMessagesComponent } from '../shared/components/backend-error-messages/backend-error-messages.component';
import { updateCurrentUserAction } from '../auth/store/actions/update-current-user';
import { CurrentUserInputInterface } from '../shared/types/currentUserInput.interface';
import { logoutAction } from '../auth/store/actions/sync.actions';

@Component({
  selector: 'medium-settings',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  fb = inject(FormBuilder);
  store = inject(Store);

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
  t;

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      user: {
        ...this.currentUser,
        ...this.form.value,
      },
    };
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
