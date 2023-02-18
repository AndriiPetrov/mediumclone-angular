import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularTagType } from '../../types/pupular.type';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { getPopularTagsAction } from './actions/get-popular-tags.actions';
import {
  errorSelector,
  isLoadingTagsSelector,
  popularTagsSelector,
} from './popular-tags.selectors';

@Component({
  selector: 'medium-popular-tag',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ErrorMessageComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  store = inject(Store);

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingTagsSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
