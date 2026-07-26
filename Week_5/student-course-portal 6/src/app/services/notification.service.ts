import { Injectable } from '@angular/core';

// Step 67: deliberately NOT providedIn: 'root'. This service is only ever
// meant to be provided at the component level (see NotificationComponent),
// so it has no default root registration — Angular will error if something
// tries to inject it without a component (or module) explicitly providing it.
@Injectable()
export class NotificationService {
  private messages: string[] = [];

  addMessage(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages;
  }
}
