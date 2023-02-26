import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UpdateArticleEffects } from './update-article.effects';

describe('UpdateArticleEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateArticleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UpdateArticleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
