import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent, CourseCardData } from '../../components/course-card/course-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  // Step 25: loading flag
  isLoading = true;

  // Step 22 + 27: hardcoded course array (5 courses) with gradeStatus
  courses: CourseCardData[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS202', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Database Systems', code: 'CS303', credits: 3, gradeStatus: 'failed' },
    { id: 4, name: 'Computer Networks', code: 'CS304', credits: 4, gradeStatus: 'passed' },
    { id: 5, name: 'Web Development', code: 'CS150', credits: 2, gradeStatus: 'pending' },
  ];

  selectedCourseId: number | null = null;

  ngOnInit(): void {
    // Step 25: simulate a loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // Step 26: trackBy — without it, Angular destroys & recreates every
  // <app-course-card> DOM node whenever the `courses` array reference changes
  // (e.g. after an HTTP refresh in later hands-ons), even for unchanged items.
  // Returning a stable id lets Angular match old/new items by identity and only
  // re-render the ones that actually changed — much cheaper for larger lists.
  trackByCourseId(index: number, course: CourseCardData): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
