import { TestBed } from '@angular/core/testing';

import { PopulaTagsService } from './popula-tags.service';

describe('PopulaTagsService', () => {
  let service: PopulaTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulaTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
