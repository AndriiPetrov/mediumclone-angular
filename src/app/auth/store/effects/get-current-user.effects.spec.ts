import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetCurrentUserEffects } from './get-current-user.effects';

describe('GetCurrentUserEffects', () => {
  let actions$: Observable<any>;
  let effects: GetCurrentUserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetCurrentUserEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GetCurrentUserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
