import { TestBed } from '@angular/core/testing';
import { unsavedChangesGuard, CanComponentDeactivate } from './unsaved-changes.guard';

describe('unsavedChangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  function runGuard(component: CanComponentDeactivate) {
    // CanDeactivateFn's remaining params (route/state) aren't used by our
    // guard, so `as any` keeps this test focused on the component argument.
    return TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(component, {} as any, {} as any, {} as any)
    );
  }

  it('should allow navigation when there are no unsaved changes', () => {
    const component: CanComponentDeactivate = { hasUnsavedChanges: () => false };
    expect(runGuard(component)).toBe(true);
  });

  it('should prompt and respect the user\'s choice when there are unsaved changes', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const component: CanComponentDeactivate = { hasUnsavedChanges: () => true };

    expect(runGuard(component)).toBe(true);
    expect(window.confirm).toHaveBeenCalledWith('You have unsaved changes. Leave?');
  });

  it('should block navigation if the user cancels the confirm dialog', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const component: CanComponentDeactivate = { hasUnsavedChanges: () => true };

    expect(runGuard(component)).toBe(false);
  });
});
