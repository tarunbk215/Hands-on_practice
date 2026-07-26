import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  // Step 31: expand/collapse toggle
  isExpanded = false;

  // Step 65: real enrollment state via EnrollmentService (replaces the local
  // `enrolled` boolean used since Hands-On 3)
  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'CourseCard ngOnChanges — previous:',
        changes['course'].previousValue,
        'current:',
        changes['course'].currentValue
      );
    }
  }

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  onEnrollClick(): void {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
    this.enrollRequested.emit(this.course.id);
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  get borderStyle(): Record<string, string> {
    const colors: Record<Course['gradeStatus'], string> = {
      passed: 'green',
      failed: 'red',
      pending: 'grey',
    };
    return { 'border-left-color': colors[this.course.gradeStatus] };
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded,
    };
  }
}
