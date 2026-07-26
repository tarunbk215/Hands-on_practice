import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  // Step 100: kept as a plain boolean (updated from the store subscription)
  // so [ngClass]/interpolation in the template stay simple, while the source
  // of truth is now `selectEnrolledIds` in the NgRx store instead of
  // EnrollmentService's local array (Hands-On 6/8).
  isEnrolled = false;
  private enrolledSub?: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.enrolledSub = this.store.select(selectEnrolledIds).subscribe((ids) => {
      this.isEnrolled = ids.includes(this.course.id);
    });
  }

  ngOnDestroy(): void {
    this.enrolledSub?.unsubscribe();
  }

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
    // Step 100
    if (this.isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
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
