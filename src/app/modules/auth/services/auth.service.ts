import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials, SignupCredentials } from '../interfaces/credentials';
import {
  Auth,
  authState,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { User } from '../model/user';
import 'firebase/auth';
import { firebaseApp$ } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User | null>(null);
  user = authState(this.fireAuth);
  constructor(private router: Router, private fireAuth: Auth) {}
  login(user: LoginCredentials, rememberMe: boolean): void {
    if (rememberMe) this.fireAuth.setPersistence(browserLocalPersistence);
    else this.fireAuth.setPersistence(browserSessionPersistence);
    from(
      signInWithEmailAndPassword(this.fireAuth, user.email, user.password)
    ).subscribe({
      next: (res) => {
        console.log('hi');
        this.router.navigate(['layout']);
      },
      error: (error) => console.log(error),
    });
  }
  logout() {
    from(this.fireAuth.signOut()).subscribe({
      next: (res) => this.router.navigate(['auth']),
      error: (error) => console.log(error),
    });
  }
  signup(user: SignupCredentials, rememberMe: boolean) {
    // this.user.next(new User(user));
    if (rememberMe) {
      from(setPersistence(this.fireAuth, browserSessionPersistence))
        .pipe(
          switchMap(() =>
            from(
              createUserWithEmailAndPassword(
                this.fireAuth,
                user.email,
                user.password
              )
            ).pipe(
              switchMap(({ user }) =>
                updateProfile(user, { displayName: user.displayName })
              )
            )
          )
        )
        .subscribe({
          next: (res) => {
            console.log('signup');
            this.router.navigate(['layout']);
          },
          error: (error) => {
            console.log(error.message);
          },
        });
    } else {
      from(setPersistence(this.fireAuth, browserLocalPersistence))
        .pipe(
          switchMap(() =>
            from(
              createUserWithEmailAndPassword(
                this.fireAuth,
                user.email,
                user.password
              )
            ).pipe(
              switchMap(({ user }) =>
                updateProfile(user, { displayName: user.displayName })
              )
            )
          )
        )
        .subscribe({
          next: (res) => this.router.navigate(['layout']),
          error: (error) => {
            console.log(error.message);
          },
        });
    }
  }
}
