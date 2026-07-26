import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  isLoading = true;
  courses: Course[] = [];
  selectedCourseId: number | null = null;

  // Step 71
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    // Step 71: read the query param back (e.g. after a page refresh/direct link)
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // Step 70: navigate to /courses/:id when a card is clicked
  goToDetail(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }

  // Step 71: reflect the search box in the URL as ?search=...
  onSearchChange(value: string): void {
    this.router.navigate(['courses'], { queryParams: { search: value || null } });
  }
}
