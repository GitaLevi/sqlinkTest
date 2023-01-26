import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cookieKeys } from 'src/app/models/emum';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { userModel } from '../../models/userModel';
import { LoadingService } from '../../services/loading.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private router: Router,
    private localStorageService: LocalStorageService) {
    this.resetForm();
  }

  ngOnInit(): void {

  }

  resetForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/gm), Validators.minLength(8),
      Validators.maxLength(20)]
      ]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.loadingService.loadingSubject.next(true);
      this.accountService.loginUser(this.loginForm.value).subscribe({
        next: (response: userModel) => {
          if (response) {
            this.router.navigate(['/info']);
          }
          else {
            alert("User does not exist in the system");
          }
          this.loadingService.loadingSubject.next(false);
        }
      });
    }
    else {
      alert("loginForm is invalid");
    }
  }
}
