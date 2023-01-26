import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cookieKeys } from '../models/emum';
import { loginModel } from '../models/loginModel';
import { personalDetailsModel, userModel } from '../models/userModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<userModel | null>;
  private userJson: string | null;
  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.userJson = localStorageService.get(cookieKeys.user);
    this.userSubject = new BehaviorSubject<userModel | null>(this.userJson ? JSON.parse(this.userJson) : null);

  }

  loginUser(user: loginModel): Observable<userModel> {
    return this.httpClient.post<userModel>(`${environment.apiUrl}/UserDetails`, user)
      .pipe(map(user => {
        if (user) {
          this.localStorageService.set(cookieKeys.token, user.token);
          this.localStorageService.set(cookieKeys.user, JSON.stringify(user));
          this.userSubject.next(user);
        }
        return user;
      }));
  }

  getUserValue(): userModel | null {
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem(cookieKeys.user);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
