import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent, CourseCardData } from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  // Step 22: hardcoded course array (5 courses)
  courses: CourseCardData[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4 },
    { id: 2, name: 'Operating Systems', code: 'CS202', credits: 3 },
    { id: 3, name: 'Database Systems', code: 'CS303', credits: 3 },
    { id: 4, name: 'Computer Networks', code: 'CS304', credits: 4 },
    { id: 5, name: 'Web Development', code: 'CS150', credits: 2 },
  ];

  selectedCourseId: number | null = null;

  // Step 23
  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
