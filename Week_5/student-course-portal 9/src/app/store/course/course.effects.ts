import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';

// Step 97: the ONLY place side effects (HTTP calls) belong in NgRx —
// reducers must stay pure functions.
//
// Using inject() here (instead of constructor parameter properties) avoids a
// field-initializer ordering bug: `loadCourses$` is a class field, and class
// fields initialize BEFORE the constructor body runs. With constructor
// injection (`constructor(private actions$: Actions) {}`), TypeScript
// assigns `this.actions$` inside the constructor body — which is too late,
// so `this.actions$` is still undefined when `loadCourses$`'s initializer
// tries to call `.pipe()` on it, throwing
// "TypeError: undefined is not an object (evaluating 'this.actions$.pipe')".
// inject() resolves the dependency immediately, at field-initialization time.
@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => loadCoursesSuccess({ courses })),
          catchError((error) => of(loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}
