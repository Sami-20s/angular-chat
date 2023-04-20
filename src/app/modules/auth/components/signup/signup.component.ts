import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class SignupComponent extends LoginComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    // this.authService.isLoggedIn$.subscribe((res) => {});
  }
  signup() {
    this.authService.signup(this.formGroup.value, this.rememberMe);
  }
  override initFormGroup(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      fullName: [null, Validators.required],
    });
  }
}
