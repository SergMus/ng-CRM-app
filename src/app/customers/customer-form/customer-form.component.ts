import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { ErrorStateMatcherService } from 'src/app/_services/error-state-matcher.service';
import { HttpService } from 'src/app/_services/http.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  pageTitle = 'create customer';
  inputFileText = 'Set avatar image';
  isFile = false;
  form: FormGroup;
  matcher = new ErrorStateMatcherService();
  customer: Customer | null;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp('[+][0-9 ]{12}')),
      ]),
      image: new FormControl('', [Validators.required]),
    });

    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService.getCustomer(+userId!).subscribe((user) => {
      this.customer = user;
      console.log(this.customer);
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      this.httpService.createCustomer(formData).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.router.navigate(['customers']);
    }
    this.openSnackBar();
  }

  openSnackBar() {
    if (this.form.valid) {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
      });
    }
  }

  onInputFile(file: Event) {
    let uploadFile = file.target as HTMLInputElement;
    if (uploadFile.files![0]) {
      this.inputFileText = uploadFile.files![0].name;
      this.isFile = true;
      console.log(uploadFile.files![0]);
    }
  }

  closeForm() {
    this.router.navigate(['/customers']);
  }
}
