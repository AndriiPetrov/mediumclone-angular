import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToFavoritesAction } from './actions/add-to-favorites.actions';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'medium-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {
  @Input() articleSlug: string;
  @Input() isFavorited: boolean;
  @Input() favoritesCount: number;

  count: number;
  isFavor: boolean;
  isLoggedIn: boolean;

  isLoggedInSubscription: Subscription;

  store = inject(Store);
  router = inject(Router);

  ngOnInit(): void {
    this.count = this.favoritesCount;
    this.isFavor = this.isFavorited;
    this.isLoggedInSubscription = this.store
      .select(isLoggedInSelector)
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  handleLike(): void {
    if (this.isLoggedIn) {
      this.store.dispatch(
        addToFavoritesAction({
          isFavorited: this.isFavor,
          slug: this.articleSlug,
        })
      );
      if (this.isFavor) {
        this.count--;
      } else {
        this.count++;
      }

      this.isFavor = !this.isFavor;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
