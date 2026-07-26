import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';

describe('loadingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => loadingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show the loading spinner before the request and hide it once it completes', () => {
    const loadingService = TestBed.inject(LoadingService);
    spyOn(loadingService, 'show');
    spyOn(loadingService, 'hide');

    const req = new HttpRequest('GET', '/courses');
    const next = () => of(new HttpResponse({ status: 200 }));

    // With a synchronous source like of(...), the entire chain — including
    // finalize()'s teardown, which runs during the automatic unsubscribe
    // right after complete() — has already finished by the time subscribe()
    // returns. So we don't need `done`/async assertions inside a callback at
    // all; asserting right after subscribe() is both correct and simpler.
    interceptor(req, next).subscribe();

    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
  });
});
