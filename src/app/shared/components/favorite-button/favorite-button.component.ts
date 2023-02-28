import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToFavoritesAction } from './actions/add-to-favorites.actions';

@Component({
  selector: 'medium-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() articleSlug: string;
  @Input() isFavorited: boolean;
  @Input() favoritesCount: number;

  count: number;
  isFavor: boolean;

  store = inject(Store);

  ngOnInit(): void {
    this.count = this.favoritesCount;
    this.isFavor = this.isFavorited;
  }

  handleLike(): void {
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
  }
}
