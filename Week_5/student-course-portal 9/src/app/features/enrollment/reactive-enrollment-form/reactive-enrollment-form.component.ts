import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noCourseCode, simulateEmailCheck } from '../../../validators/enrollment.validators';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css',
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Step 49
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Step 53: courseId also gets the custom noCourseCode validator
      courseId: [null, [Validators.required, noCourseCode]],
      // Step 55: async validator runs after sync validators pass
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck]),
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      // Step 56: FormArray for repeating course controls, starts empty
      additionalCourses: this.fb.array([]),
    });
  }

  // Step 57: typed getter — casting `enrollForm.get('additionalCourses') as FormArray`
  // directly in the template would need to be repeated (and re-cast) everywhere it's
  // used. A getter centralises the cast in one place, gives autocomplete/type-safety
  // in the component class, and keeps the template free of TypeScript syntax.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Step 77: used by unsavedChangesGuard to decide whether to prompt on navigation away
  hasUnsavedChanges(): boolean {
    return this.enrollForm.dirty;
  }

  onSubmit(): void {
    // Step 51
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());

    // Step 52: .value excludes any controls marked `disabled` (they're skipped
    // when the value tree is built). .getRawValue() walks every control
    // regardless of disabled state, so it always includes the full shape —
    // useful when you disable a field for display but still need to submit it.
  }
}
