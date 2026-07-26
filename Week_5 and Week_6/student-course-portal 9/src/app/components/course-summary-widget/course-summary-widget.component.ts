import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  imports: [],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css',
})
export class CourseSummaryWidgetComponent implements OnInit {
  totalCourses = 0;

  // Step 62: a second component injecting the SAME CourseService singleton
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.refreshCount();
  }

  refreshCount(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.totalCourses = courses.length),
    });
  }

  addSampleCourse(): void {
    const nextId = this.totalCourses + 1;
    this.courseService
      .createCourse({
        name: `Sample Course ${nextId}`,
        code: `SMP${nextId}`,
        credits: 2,
        gradeStatus: 'pending',
      })
      .subscribe({
        next: () => this.refreshCount(),
      });
  }
}
