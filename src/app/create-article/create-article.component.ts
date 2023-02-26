import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../shared/components/article-form/article-form.component';
import { ArticleInputInterface } from '../shared/types/articleInput.interface';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from './store/selectors/create-article.selectors';
import { createArticleAction } from './store/actions/create-article.actions';

@Component({
  selector: 'medium-create-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  store = inject(Store);

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    if (typeof articleInput.tagList === 'string') {
      articleInput = {
        ...articleInput,
        tagList: articleInput.tagList.split(' '),
      };
    }

    this.store.dispatch(
      createArticleAction({ createArticle: { article: articleInput } })
    );
  }
}
