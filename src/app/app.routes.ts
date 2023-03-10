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
import { CreateArticleEffects } from './create-article/store/effects/create-article.effects';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './create-article/store/reducers/create-article.reducer';
import {
  editArticleFeatureKey,
  editArticleReducer,
} from './edit-article/reducers/edit-article.reducer';
import { UpdateArticleEffects } from './edit-article/effects/update-article.effects';
import { GetArticleEffects as EditGetArticleEffects } from './edit-article/effects/get-article.effects';
import { UpdateCurrentUserEffects } from './auth/store/effects/update-current-user.effects';
import {
  settingsFeatureKey,
  settingsReducer,
} from './settings/reducers/settings.reducer';
import { LogoutEffects } from './auth/store/effects/logout.effects';
import { AddToFavoritesEffects } from './shared/components/favorite-button/effects/add-to-favorites.effects';

export const APP_ROUTES: Routes = [
  {
    path: 'register',
    providers: [provideEffects(RegisterEffects)],
    loadComponent: () =>
      import('./auth/components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    providers: [provideEffects(LoginEffects)],
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'settings',
    providers: [
      provideEffects(UpdateCurrentUserEffects, LogoutEffects),
      provideState(settingsFeatureKey, settingsReducer),
    ],
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
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
        DeleteArticleEffects,
        AddToFavoritesEffects
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
    path: 'articles/new',
    providers: [
      provideState(createArticleFeatureKey, createArticleReducer),
      provideEffects(CreateArticleEffects),
    ],
    loadComponent: () =>
      import('./create-article/create-article.component').then(
        (m) => m.CreateArticleComponent
      ),
  },
  {
    path: 'articles/:slug',
    loadComponent: () =>
      import('./article/article.component').then((m) => m.ArticleComponent),
  },
  {
    path: 'articles/:slug/edit',
    providers: [
      provideState(editArticleFeatureKey, editArticleReducer),
      provideEffects(UpdateArticleEffects, EditGetArticleEffects),
    ],
    loadComponent: () =>
      import('./edit-article/edit-article.component').then(
        (m) => m.EditArticleComponent
      ),
  },
];
