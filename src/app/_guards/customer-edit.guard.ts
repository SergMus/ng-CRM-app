import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CustomerFormComponent } from '../customers/customer-form/customer-form.component';

@Injectable()
export class CustomerEditGuard
  implements CanActivate, CanDeactivate<CustomerFormComponent>
{
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let id = +route.params['id'];

    if (isNaN(id) || id < 1) {
      this.router.navigate(['/customers']);
      console.log('add customer ID to request!');

      return false;
    }
    return true;
  }

  canDeactivate(component: CustomerFormComponent): boolean {
    if (component.form.dirty) {
      let customer = component.form.get('firstName')?.value || 'New Customer';
      return confirm(`Are you sure to loose all changes to ${customer}?`);
    }
    return true;
  }
}
