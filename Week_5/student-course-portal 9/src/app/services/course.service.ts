import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

const API_URL = 'http://localhost:3000/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Step 78
  constructor(private http: HttpClient) {}

  // Step 79 + 83-86: HTTP GET with RxJS operators chained on top
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(API_URL).pipe(
      // Step 83: transform the response before it reaches the component
      map((courses) => courses.filter((c) => c.credits > 0)),
      // Step 85: tap is for side effects (logging) — it must NOT alter the
      // stream. If you need to change the emitted value, use map instead.
      tap((courses) => console.log('Courses loaded:', courses.length)),
      // Step 86: retry the request up to 2 times before giving up
      retry(2),
      // Step 84: turn any HTTP failure into a friendly, typed error
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  // Step 79
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${API_URL}/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error(`Failed to load course ${id}.`));
      })
    );
  }

  // Step 81
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(API_URL, course);
  }

  // Step 82
  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${API_URL}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
