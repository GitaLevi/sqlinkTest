import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  loadSubscription: Subscription;
  isShowLoading: boolean = false;
  /**
   *
   */
  constructor(private loadingService: LoadingService) {
    this.loadSubscription = this.loadingService.loadingSubject.subscribe((isLoad) => {
      this.isShowLoading = isLoad;
    })
  }
}
