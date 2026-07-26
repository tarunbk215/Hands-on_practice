import { Routes } from '@angular/router';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './reactive-enrollment-form/reactive-enrollment-form.component';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

// Step 73: Angular 20 defaults to standalone components, so there is no
// NgModule to generate here (`ng generate module` still works, but a
// routing NgModule is no longer the recommended way to group a lazy feature).
// The standalone equivalent is a plain Routes array that app.routes.ts lazy
// loads with `loadChildren: () => import('./enrollment.routes').then(m => m.ENROLLMENT_ROUTES)`
// — same on-demand chunk behaviour, no module boilerplate required.
export const ENROLLMENT_ROUTES: Routes = [
  { path: '', component: EnrollmentFormComponent },
  {
    path: 'reactive',
    component: ReactiveEnrollmentFormComponent,
    canDeactivate: [unsavedChangesGuard],
  },
];
