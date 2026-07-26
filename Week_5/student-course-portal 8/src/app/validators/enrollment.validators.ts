import { AbstractControl, ValidationErrors } from '@angular/forms';

// Step 53: custom synchronous validator
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Step 55: custom async validator (Promise-based)
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value = (control.value ?? '') as string;
      if (value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}
