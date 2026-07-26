import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

// Note: this inline shape is promoted to a proper Course interface
// (models/course.model.ts) in Hands-On 6, step 59.
export interface CourseCardData {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: CourseCardData;
  @Output() enrollRequested = new EventEmitter<number>();

  // Step 29: local enrolled flag (becomes real state via EnrollmentService in HO6)
  enrolled = false;

  // Step 31: expand/collapse toggle
  isExpanded = false;

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

  onEnrollClick(): void {
    this.enrolled = !this.enrolled;
    this.enrollRequested.emit(this.course.id);
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  // Step 30: border colour by grade status
  get borderStyle(): Record<string, string> {
    const colors: Record<CourseCardData['gradeStatus'], string> = {
      passed: 'green',
      failed: 'red',
      pending: 'grey',
    };
    return { 'border-left-color': colors[this.course.gradeStatus] };
  }

  // Step 32: getter form of ngClass keeps the template free of inline object
  // literals — logic for "which classes apply" lives in TS (testable, reusable)
  // instead of being re-evaluated from a template expression on every check.
  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.enrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded,
    };
  }
}
