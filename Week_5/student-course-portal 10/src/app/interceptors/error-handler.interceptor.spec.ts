import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { throwError } from 'rxjs';

import { errorHandlerInterceptor } from './error-handler.interceptor';

describe('errorHandlerInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorHandlerInterceptor(req, next));

  beforeEach(() => {
    // errorHandlerInterceptor injects Router to redirect on 401
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should navigate home and re-throw on a 401 response', (done) => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const req = new HttpRequest('GET', '/courses');
    const next = () =>
      throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' }));

    interceptor(req, next).subscribe({
      error: (err) => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(err.status).toBe(401);
        done();
      },
    });
  });

  it('should re-throw (without navigating) on a 500 response', (done) => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const req = new HttpRequest('GET', '/courses');
    const next = () =>
      throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Server Error' }));

    interceptor(req, next).subscribe({
      error: (err) => {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(err.status).toBe(500);
        done();
      },
    });
  });
});
