import { Customer } from '../../models/customer';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit, AfterViewInit {
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

  constructor(private httpService: HttpService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.httpService.getCustomers().subscribe({
      next: (resp: any) => {
        this.customers = resp.users;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
