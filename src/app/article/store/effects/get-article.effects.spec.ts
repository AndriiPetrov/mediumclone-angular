import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetArticleEffects } from './get-article.effects';

describe('GetArticleEffects', () => {
  let actions$: Observable<any>;
  let effects: GetArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetArticleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GetArticleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
