import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { NotificationComponent } from '../../components/notification/notification.component';
import { loadCourses } from '../../store/course/course.actions';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, NotificationComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent implements OnInit {
  // Step 99/100: derived via the cross-slice selectEnrolledCourses selector
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }

  ngOnInit(): void {
    // Ensures the 'course' slice is populated even if /profile is visited
    // directly, without going through /courses first — the reducer/effect
    // handle a duplicate dispatch harmlessly (just refetches).
    this.store.dispatch(loadCourses());
  }
}
