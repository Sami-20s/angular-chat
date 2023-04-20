import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials, SignupCredentials } from '../interfaces/credentials';
import { BehaviorSubject, switchMap, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.production';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private router: Router, private http: HttpClient) {}
  login(user: LoginCredentials, rememberMe: boolean) {
    this.http
      .post<User>(
        environment.authUrl + `signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .subscribe({
        next: (res) => {
          this.setUser(res, rememberMe);
        },
        error: (error) => console.log(error),
      });
  }
  logout() {
    this.user.next(null);
    this.clearCookie();
    this.router.navigate(['auth']);
  }
  signup(user: SignupCredentials, rememberMe: boolean): void {
    this.http
      .post<User>(environment.authUrl + `signUp?key=${environment.apiKey}`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        mergeMap((user) => {
          console.log(user);
          return this.http.post<User>(
            environment.authUrl + `update?key=${environment.apiKey}`,
            { displayName: user.fullName, idToken: user.idToken }
          );
        })
      )
      .subscribe({
        next: (user) => {
          console.log(user);
          this.setUser(user, rememberMe);
          this.user.next(user);
        },
        error: (error) => console.log(error),
      });
  }
  autoLogin() {
    const cookies = document.cookie.split(';');
    const index = cookies.findIndex((el) => el.includes('user='));
    if (index > -1) {
      const user = JSON.parse(cookies[index].split('user=')[1]);
      this.user.next(user);
    }
  }
  private setUser(user: User, rememberMe: boolean) {
    console.log(user);
    if (rememberMe) {
      this.setCookie(user, 1);
    } else {
      this.setCookie(user, null);
    }
    this.user.next(user);
    this.router.navigate(['layout']);
  }
  private setCookie(user: User, months: number | null) {
    let date;
    if (months) {
      date = new Date();
      date.setMonth(date.getMonth() + months);
    } else {
      date = 'Session';
    }
    document.cookie = `user=${JSON.stringify(
      user
    )}; expires=${date}; Secure;SameSite=None;path=/`;
  }
  private clearCookie() {
    document.cookie =
      'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None;Secure;path=/';
  }
}
