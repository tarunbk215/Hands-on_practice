import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Hardcoded for now, as the exercise specifies — a real login flow would
  // set this from a successful HTTP auth response.
  isLoggedIn = true;
}
