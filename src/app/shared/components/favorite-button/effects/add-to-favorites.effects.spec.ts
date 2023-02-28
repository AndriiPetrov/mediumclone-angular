import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AddToFavoritesEffects } from './add-to-favorites.effects';

describe('AddToFavoritesEffects', () => {
  let actions$: Observable<any>;
  let effects: AddToFavoritesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddToFavoritesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AddToFavoritesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
