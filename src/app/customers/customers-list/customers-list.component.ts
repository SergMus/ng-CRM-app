import { Customer } from '../../models/customer';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/_services/http.service';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  pageTitle = 'Customers';

  customers: Customer[] = [];
  dataSource: any = null;
  displayedColumns: string[] = [
    'position',
    'image',
    'firstname',
    'lastname',
    'email',
    'phone',
  ];
  options: string[] = [];
  selectOptions: string[] = ['firstName', 'lastName', 'email', 'phone'];

  constructor(private httpService: HttpService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  refreshData(data: any) {
    this.customers = data.users;
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.httpService.getCustomers().subscribe({
      next: (resp: any) => {
        this.refreshData(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(option: MatSelect) {
    let column: string = option.value;

    this.dataSource.filterPredicate = (d: any, filter: string) => {
      const textToSearch = (d[column] && d[column].toLowerCase()) || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  onInput(text: HTMLInputElement) {
    return (this.dataSource.filter = text.value);
  }
}
