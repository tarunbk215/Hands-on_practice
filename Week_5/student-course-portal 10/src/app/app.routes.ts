import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Step 72: nested routes — CoursesLayoutComponent hosts a router-outlet
  // that renders either the list ('') or the detail (':id') child route.
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent },
    ],
  },

  // Step 76: guarded route
  { path: 'profile', component: StudentProfileComponent, canActivate: [authGuard] },

  // Step 73 + 76: lazy-loaded feature area, also guarded
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment.routes').then((m) => m.ENROLLMENT_ROUTES),
  },

  // Step 68: wildcard must always be last
  { path: '**', component: NotFoundComponent },
];
