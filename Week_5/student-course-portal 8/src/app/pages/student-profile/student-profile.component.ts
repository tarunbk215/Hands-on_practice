import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, NotificationComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent implements OnInit {
  enrolledCourses: Course[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.refreshEnrolledCourses();
  }

  refreshEnrolledCourses(): void {
    this.enrollmentService.getEnrolledCourses().subscribe({
      next: (courses) => (this.enrolledCourses = courses),
    });
  }
}
