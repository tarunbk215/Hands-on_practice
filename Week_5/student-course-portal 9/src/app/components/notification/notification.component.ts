import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  // Step 67: component-level provider. This creates a NEW NotificationService
  // instance scoped to this component (and any of its children) — separate
  // from any other instance elsewhere in the app. Useful when a widget needs
  // its own private state (e.g. per-widget notification queue) rather than
  // sharing one global instance the way providedIn: 'root' services do.
  providers: [NotificationService],
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {}

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  simulateNotification(): void {
    this.notificationService.addMessage(`Notification at ${new Date().toLocaleTimeString()}`);
  }
}
