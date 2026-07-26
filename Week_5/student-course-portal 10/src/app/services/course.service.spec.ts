import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS202', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    // Step 106: standalone equivalent of importing HttpClientTestingModule —
    // provideHttpClient() + provideHttpClientTesting() together give a
    // mockable HttpClient backed by HttpTestingController.
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CourseService],
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Step 107: fails the test if there are any outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Step 107
  it('should fetch courses via GET', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Step 108: error handling — getCourses() has retry(2), so a persistent
  // failure means 3 total requests (1 initial + 2 retries) before catchError
  // surfaces the friendly error message.
  it('should surface a friendly error after retries are exhausted on a server error', () => {
    let capturedError: Error | undefined;

    service.getCourses().subscribe({
      next: () => fail('expected an error, not a successful emission'),
      error: (err: Error) => (capturedError = err),
    });

    // Respond with a 500 to all 3 attempts (initial + 2 retries)
    for (let attempt = 0; attempt < 3; attempt++) {
      const req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    }

    expect(capturedError?.message).toBe('Failed to load courses. Please try again.');
  });
});
