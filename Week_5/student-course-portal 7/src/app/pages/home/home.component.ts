import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, CourseSummaryWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  // Step 11: interpolation
  portalName = 'Student Course Portal';

  // Step 12: property binding target
  isPortalActive = true;

  // Step 13: event binding target
  message = '';

  // Step 14: two-way binding target
  searchTerm = '';

  coursesAvailable = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // Step 61: live count from the shared CourseService singleton
    this.coursesAvailable = this.courseService.getCourses().length;
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    // Task 2, step 17
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  // Step 15 (in a comment, as required):
  // [property]="expr"      -> ONE-WAY binding, data flows component -> DOM only.
  //                            The DOM element's property is set from the component
  //                            value; typing in the DOM does NOT change the component.
  // [(ngModel)]="prop"     -> TWO-WAY binding, data flows DOM <-> component. It is
  //                            sugar for [ngModel]="prop" (ngModelChange)="prop=$event":
  //                            the component sets the input's value AND listens for
  //                            user input to write the new value back into `prop`.
}
