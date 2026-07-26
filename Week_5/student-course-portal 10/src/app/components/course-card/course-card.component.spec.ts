import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let store: MockStore;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  beforeEach(async () => {
    // Step 101: TestBed configuration. CourseCardComponent is standalone, so
    // it goes in `imports`, not `declarations`. It also injects NgRx's
    // Store (for enrollment state, HO9), so we provide a MockStore instead
    // of the real store/reducers.
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideMockStore({ initialState: { enrollment: { enrolledCourseIds: [] } } })],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    // Set the required @Input BEFORE the first detectChanges, since the
    // template reads course.name/course.code immediately.
    component.course = mockCourse;
    fixture.detectChanges();
  });

  // Step 102
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: @Input rendering
  it('should render the course name from the @Input', () => {
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(h3.textContent).toContain('Data Structures');
  });

  // Step 104: @Output emission
  it('should emit enrollRequested with the course id when Enroll is clicked', () => {
    spyOn(component.enrollRequested, 'emit');

    const enrollButton = fixture.debugElement.query(By.css('.card-actions button')).nativeElement as HTMLButtonElement;
    enrollButton.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Step 105: ngOnChanges
  it('should log previous and current value on ngOnChanges', () => {
    spyOn(console, 'log');

    const updatedCourse: Course = { ...mockCourse, name: 'Advanced Data Structures' };
    component.ngOnChanges({
      course: {
        previousValue: mockCourse,
        currentValue: updatedCourse,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(console.log).toHaveBeenCalledWith(
      'CourseCard ngOnChanges — previous:',
      mockCourse,
      'current:',
      updatedCourse
    );
  });
});
