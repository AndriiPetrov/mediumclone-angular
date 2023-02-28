import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from './store/actions/get-feed.actions';
import { Observable, Subscription } from 'rxjs';
import { GetFeedResponseInterface } from './types/get-feed-response.interface';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from './store/selectors';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLinkWithHref,
} from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { environment } from 'src/environments/environment';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'medium-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    FavoriteButtonComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input() apiUrl: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;
  limit = environment.limit;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    console.log('initialized feed');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        console.log('currentPage', this.currentPage);
        this.fetchFeed();
      }
    );
  }
}
