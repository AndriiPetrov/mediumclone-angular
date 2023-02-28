import { TestBed } from '@angular/core/testing';

import { FavoriteButtonService } from './favorite-button.service';

describe('FavoriteButtonService', () => {
  let service: FavoriteButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
