import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    // NotificationService is deliberately NOT providedIn: 'root' (HO6,
    // step 67 — it's only meant to be provided at the component level), so
    // it must be listed explicitly here or TestBed.inject throws NG0201.
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and return messages', () => {
    expect(service.getMessages()).toEqual([]);
    service.addMessage('Test message');
    expect(service.getMessages()).toEqual(['Test message']);
  });
});
