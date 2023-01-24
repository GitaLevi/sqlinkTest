import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSubject: Subject<boolean> = new Subject<boolean>();
  constructor() { }

}
