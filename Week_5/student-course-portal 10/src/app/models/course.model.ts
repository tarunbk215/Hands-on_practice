// Step 59: Course interface — replaces the inline CourseCardData shape used
// since Hands-On 2/3. Defining this once gives compile-time type checking
// everywhere the app deals with course data, instead of relying on 'any'.
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}
