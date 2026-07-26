import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  imports: [],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css',
})
export class CourseSummaryWidgetComponent {
  // Step 62: a second component injecting the SAME CourseService instance
  // (providedIn: 'root' means one singleton is shared app-wide). Adding a
  // course elsewhere and refreshing this widget's count proves that.
  constructor(private courseService: CourseService) {}

  get totalCourses(): number {
    return this.courseService.getCourses().length;
  }

  addSampleCourse(): void {
    const nextId = this.courseService.getCourses().length + 1;
    this.courseService.addCourse({
      id: nextId,
      name: `Sample Course ${nextId}`,
      code: `SMP${nextId}`,
      credits: 2,
      gradeStatus: 'pending',
    });
  }
}
