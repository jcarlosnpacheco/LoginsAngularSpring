import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() openCloseMenu = new EventEmitter();
  countDown = new Subscription();
  tick = 1000; //1 second
  isLogged$ = this.authService.logged();
  timeLeftInSeconds =
    (this.authService.getExpiration() * 1000 - new Date().getTime()) / 1000;

  constructor(
    private authService: AuthService,
    private message: MessageService
  ) {}

  ngOnDestroy(): void {
    this.authService.logoff();
    this.countDown.unsubscribe();
  }
  ngOnInit(): void {
    if (this.isLogged$) {
      this.countDown = timer(0, this.tick).subscribe(() => {
        --this.timeLeftInSeconds;
        if (this.timeLeftInSeconds <= 1) {
          if (this.authService.hasToken()) {
            setTimeout(() => {
              this.logoff();
            }, 1000);
            this.message.showWarningMessage('Session expired.');
          }
          this.timeLeftInSeconds = 0;
        }
      });
    }
  }

  logoff() {
    this.authService.logoff();
    window.location.reload();
  }
}
