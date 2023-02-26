import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CreateArticleEffects } from './create-article.effects';

describe('CreateArticleEffects', () => {
  let actions$: Observable<any>;
  let effects: CreateArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateArticleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CreateArticleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
