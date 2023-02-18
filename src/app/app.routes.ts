import { LoginEffects } from './auth/store/effects/login.effects';
import { LoginComponent } from './auth/components/login/login.component';
import { provideState } from '@ngrx/store';
import { Routes } from '@angular/router';

import { RegisterComponent } from './auth/components/register/register.component';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideEffects } from '@ngrx/effects';
import { RegisterEffects } from './auth/store/effects/register.effects';
import { GetFeedEffects } from './shared/components/feed/store/effects/get-feed.effects';
import {
  feedReducer,
  feedReducerFeatureKey,
} from './shared/components/feed/store/reducer';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './shared/components/popular-tags/reducer';
import { GetPopularTagsEffects } from './shared/components/popular-tags/effects/get-popular-tags.effects';
import {
  articleReducer,
  getArticleFeatureKey,
} from './article/store/reducers/get-article.reducer';
import { GetArticleEffects } from './article/store/effects/get-article.effects';
import { DeleteArticleEffects } from './article/store/effects/delete.effects';

export const APP_ROUTES: Routes = [
  {
    path: 'register',
    // component: RegisterComponent,
    providers: [provideEffects(RegisterEffects)],
    loadComponent: () =>
      import('./auth/components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    // providers: [provideState(authFeatureKey, authReducer)],
  },
  {
    path: 'login',
    // component: LoginComponent,
    providers: [provideEffects(LoginEffects)],
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./global-feed/components/global-feed/global-feed.component').then(
  //       (m) => m.GlobalFeedComponent
  //     ),
  // },
  {
    path: '',
    providers: [
      provideState(feedReducerFeatureKey, feedReducer),
      provideState(popularTagsFeatureKey, popularTagsReducer),
      provideState(getArticleFeatureKey, articleReducer),
      provideEffects(
        GetFeedEffects,
        GetPopularTagsEffects,
        GetArticleEffects,
        DeleteArticleEffects
      ),
    ],
    loadChildren: () =>
      import('./global-feed/global-feed.routes').then(
        (m) => m.GLOBAL_FEED_ROUTES
      ),
    // component: GlobalFeedComponent,
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./your-feed/your-feed.component').then(
        (m) => m.YourFeedComponent
      ),
  },
  {
    path: 'tags/:slug',
    loadComponent: () =>
      import('./tag-feed/tag-feed.component').then((m) => m.TagFeedComponent),
  },
  {
    path: 'articles/:slug',
    loadComponent: () =>
      import('./article/article.component').then((m) => m.ArticleComponent),
  },
];
