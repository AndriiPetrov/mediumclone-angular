import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UpdateCurrentUserEffects } from './update-current-user.effects';

describe('UpdateCurrentUserEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateCurrentUserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateCurrentUserEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UpdateCurrentUserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
