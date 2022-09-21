import { Customer, CustomerEndpoint } from '../../models/customer';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/_services/http.service';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  pageTitle = 'Customers';

  customers: Customer[] = [];
  dataSource: MatTableDataSource<Customer>;
  displayedColumns: readonly string[] = [
    'position',
    'image',
    'firstname',
    'lastname',
    'email',
    'phone',
    'edit',
  ];
  options: string[] = [];
  selectOptions: string[] = ['firstName', 'lastName', 'email', 'phone'];

  constructor(private httpService: HttpService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  refreshData(data: CustomerEndpoint) {
    this.customers = data.users;
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.httpService.getCustomers().subscribe({
      next: (resp: CustomerEndpoint) => {
        this.refreshData(resp);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(option: MatSelect) {
    let column: string = option.value;

    this.dataSource.filterPredicate = (d: Customer, filter: string) => {
      const textToSearch =
        (d[column as keyof Customer] &&
          d[column as keyof Customer]?.toString().toLowerCase()) ||
        '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  onInput(text: HTMLInputElement) {
    return (this.dataSource.filter = text.value);
  }
}
