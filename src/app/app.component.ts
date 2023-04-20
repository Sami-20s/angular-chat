import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'angular-chat';
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
