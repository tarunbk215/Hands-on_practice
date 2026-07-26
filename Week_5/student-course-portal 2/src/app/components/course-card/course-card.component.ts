import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

// Note: this inline shape is promoted to a proper Course interface
// (models/course.model.ts) in Hands-On 6, step 59.
export interface CourseCardData {
  id: number;
  name: string;
  code: string;
  credits: number;
}

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnChanges {
  // Step 18 / 20
  @Input() course!: CourseCardData;

  // Step 21
  @Output() enrollRequested = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    // Step 18: log previous and current value whenever the input changes
    if (changes['course']) {
      console.log(
        'CourseCard ngOnChanges — previous:',
        changes['course'].previousValue,
        'current:',
        changes['course'].currentValue
      );
    }
  }
}
