import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { select, Store } from '@ngrx/store';
import {
  currentUserSelector,
  isAnonymouseSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors';

@Component({
  selector: 'medium-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymouseSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
