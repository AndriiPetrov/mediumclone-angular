import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetPopularTagsEffects } from './get-popular-tags.effects';

describe('GetPopularTagsEffects', () => {
  let actions$: Observable<any>;
  let effects: GetPopularTagsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetPopularTagsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GetPopularTagsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
