import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Event,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  loader(event: any, isLoading: boolean): void {
    switch (true) {
      case event instanceof NavigationStart: {
        isLoading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        isLoading = false;
        break;
      }
      default: {
        break;
      }
    }
  }
}
