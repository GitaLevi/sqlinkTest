import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.resetForm();
  }

  ngOnInit(): void {

  }

  resetForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^([a-Z]+[0-9]|[0-9]+[a-Z])[a-Z0-9]*$'), Validators.minLength(8),
      Validators.maxLength(20)]
      ]
    });
  }

  submitForm() {
    console.log(this.loginForm.getRawValue());
  }

}
