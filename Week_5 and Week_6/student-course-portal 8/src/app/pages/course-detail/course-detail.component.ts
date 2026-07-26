import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { EnrollmentService, Student } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  enrolledStudents: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    // Step 87: chain two HTTP calls — load the course, then (once we know
    // which course it is) load the students enrolled in it. switchMap
    // cancels the previous inner Observable (the students request) if a new
    // outer value arrives before it completes — important here because if
    // the user quickly navigates from one course's detail page to another,
    // switchMap guarantees we only ever see students for the CURRENT course,
    // not a late-arriving response for a course we've already left.
    this.courseService
      .getCourseById(id)
      .pipe(
        tap((course) => (this.course = course)),
        switchMap((course) => this.enrollmentService.getStudentsByCourse(course.id))
      )
      .subscribe({
        next: (students) => (this.enrolledStudents = students),
        error: () => (this.course = undefined),
      });
  }
}
