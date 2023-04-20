import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;
  rememberMe: boolean = false;
  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.initFormGroup();
  }
  login() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value, this.rememberMe);
    }
  }
  initFormGroup() {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
  ngOnInit(): void {}
}
