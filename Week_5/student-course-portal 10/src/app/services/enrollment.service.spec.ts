import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EnrollmentService } from './enrollment.service';

describe('EnrollmentService', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    // EnrollmentService injects HttpClient directly, and CourseService
    // (which also needs HttpClient) — both need testing providers.
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track enroll/unenroll state', () => {
    expect(service.isEnrolled(1)).toBe(false);
    service.enroll(1);
    expect(service.isEnrolled(1)).toBe(true);
    service.unenroll(1);
    expect(service.isEnrolled(1)).toBe(false);
  });
});
