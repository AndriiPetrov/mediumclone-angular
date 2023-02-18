import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { getArticleAction } from './store/actions/get-article.actions';
import { ActivatedRoute, Params, RouterLinkWithHref } from '@angular/router';
import { ArticleInterface } from '../shared/types/article.interface';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from './store/selectors/article.selectors';
import { currentUserSelector } from '../auth/store/selectors';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';
import { TagListComponent } from '../shared/components/tag-list/tag-list.component';
import { deleteArticleAction } from './store/actions/delete.actions';

@Component({
  selector: 'medium-article',
  standalone: true,
  imports: [
    NgIf,
    RouterLinkWithHref,
    AsyncPipe,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  store = inject(Store);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.slug = params['slug'];
    // });
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
      map(([article, currentUser]) => {
        if (!article || !currentUser) {
          return false;
        }
        return article?.author?.username === currentUser?.username;
      })
    );
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
