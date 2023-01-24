import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectModel } from '../models/projectsModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDetailsService {

  constructor(private httpClient: HttpClient) { }

  getUserProjects(): Observable<projectModel[]> {
    return this.httpClient.get<projectModel[]>("https://private-052d6-testapi4528.apiary-mock.com/info"/*`${environment.apiUrl}/users/authenticate`*/)

  }
}
