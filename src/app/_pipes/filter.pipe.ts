import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    customer: Customer[],
    search: string,
    findBy: string = 'firstName'
  ): Customer[] {
    if (!search.trim()) {
      return customer;
    }
    return customer.filter((str: any) => {
      return str[findBy].toLowerCase().includes(search.toLocaleLowerCase());
    });
  }
}
