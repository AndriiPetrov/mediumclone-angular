import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { PersistanceService } from './persistance.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const persistanceService = inject(PersistanceService);

  const token = persistanceService.get('accessToken');

  req = req.clone({
    setHeaders: {
      authorization: token ? `Token ${token}` : '',
    },
  });
  return next(req);
};
