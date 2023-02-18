import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'medium-feed-toggler',
  standalone: true,
  imports: [NgIf, RouterLinkWithHref, RouterLinkActive, AsyncPipe],
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit {
  @Input() tagName: string | null;

  isLoggedIn$: Observable<boolean>;

  store = inject(Store);

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
