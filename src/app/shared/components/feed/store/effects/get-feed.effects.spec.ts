import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetFeedEffects } from './get-feed.effects';

describe('GetFeedEffects', () => {
  let actions$: Observable<any>;
  let effects: GetFeedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetFeedEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GetFeedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
