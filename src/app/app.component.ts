import { HttpResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './_services/authentication.service';
import { HttpService } from './_services/http.service';
import { NavigationService } from './_services/navigation.service';

const REGISTRATION_USER_ID = 4;
type UserProfile = User | null;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-crm';
  isLoading = false;
  panelState = false;
  profileState = false;
  cardState = false;
  userProfile: UserProfile;
  readonly _iconOpen = 'keyboard_tab';
  readonly _iconClose = 'toc';

  @ViewChild('leftMenu') menu: ElementRef<any>;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    public authService: AuthenticationService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      this.navigationService.loader(event, this.isLoading);
    });

    this.httpService.getUser(REGISTRATION_USER_ID).subscribe({
      next: (user: User) => {
        this.userProfile = user;
      },
      error: (err: Error) => console.log(err),
    });
  }

  panelToggle() {
    this.panelState = !this.panelState;
  }

  cardToggle() {
    this.cardState = !this.cardState;
  }

  get iconOpen() {
    return this._iconOpen;
  }

  get iconClose() {
    return this._iconClose;
  }
}
