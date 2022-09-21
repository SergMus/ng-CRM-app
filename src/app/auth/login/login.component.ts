import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/shared/AppSettings';
import { AuthenticationService } from 'src/app/_services/authentication.service';

export interface FormData {
  email: string;
  password: string;
}
@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  errorMessage: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(AppSettings.USER_EMAIL, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(AppSettings.USER_PASSWORD, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: FormData = { ...this.form.value };
      this.authService.login(formData).subscribe({
        next: (resp) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }

  errorToggle() {
    this.errorMessage = !this.errorMessage;
  }
}
