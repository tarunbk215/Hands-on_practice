import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header to every outgoing request', (done) => {
    const req = new HttpRequest('GET', '/courses');
    const next = jasmine.createSpy('next').and.callFake((clonedReq: HttpRequest<unknown>) => {
      expect(clonedReq.headers.get('Authorization')).toBe('Bearer mock-token-12345');
      return of(new HttpResponse({ status: 200 }));
    });

    interceptor(req, next).subscribe(() => done());
  });
});
