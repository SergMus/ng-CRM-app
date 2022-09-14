import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  show() {
    return this.isLoading.next(true);
  }

  hide() {
    return this.isLoading.next(false);
  }
}
