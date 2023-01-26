import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { projectModel } from '../models/projectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDetailsService {

  constructor(private httpClient: HttpClient) { }

  getProjectsByUserId(): Observable<projectModel[]> {
    return this.httpClient.get<projectModel[]>(`${environment.apiUrl}/UserDetails`);
  }
}
