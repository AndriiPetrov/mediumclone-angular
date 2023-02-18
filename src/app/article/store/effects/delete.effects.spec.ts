import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DeleteEffects } from './delete.effects';

describe('DeleteEffects', () => {
  let actions$: Observable<any>;
  let effects: DeleteEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DeleteEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
