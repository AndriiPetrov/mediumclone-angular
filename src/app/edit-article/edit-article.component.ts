import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { getArticleAction } from './actions/get-article.actions';
import { select, Store } from '@ngrx/store';
import { ArticleInputInterface } from '../shared/types/articleInput.interface';
import { createArticleAction } from '../create-article/store/actions/create-article.actions';
import { updateArticleAction } from './actions/update-article.actions';
import { filter, map, Observable } from 'rxjs';
import { BackendErrorsInterface } from '../shared/types/backendErrors.interface';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from './selectors/edit-article.selectors';
import { ArticleFormComponent } from '../shared/components/article-form/article-form.component';
import { ArticleInterface } from '../shared/types/article.interface';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'medium-edit-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  slug: string;
  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  route = inject(ActivatedRoute);
  store = inject(Store);

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => ({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }))
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    if (typeof articleInput.tagList === 'string') {
      articleInput = {
        ...articleInput,
        tagList: articleInput.tagList.split(' '),
      };
    }

    this.store.dispatch(
      updateArticleAction({
        createArticle: { article: articleInput },
        slug: this.slug,
      })
    );
  }
}
