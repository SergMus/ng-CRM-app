import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from './_services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CustomersModule } from './customers/customers.module';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterPipe } from './_pipes/filter.pipe';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  deps: [AuthenticationService],
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    HomeComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    CustomersModule,
    MatGridListModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
