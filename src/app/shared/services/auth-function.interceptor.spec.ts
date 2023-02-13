import { TestBed } from '@angular/core/testing';

import { AuthFunctionInterceptor } from './auth-function.interceptor';

describe('AuthFunctionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthFunctionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthFunctionInterceptor = TestBed.inject(AuthFunctionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
