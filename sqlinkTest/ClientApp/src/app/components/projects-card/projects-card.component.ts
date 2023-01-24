import { Component, OnInit } from '@angular/core';
import { projectModel } from 'src/app/models/projectsModel';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectsDetailsService } from 'src/app/services/projects-details.service';

@Component({
  selector: 'app-projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.scss']
})
export class ProjectsCardComponent implements OnInit {
  projectsList: projectModel[];
  constructor(private projectDetailsService: ProjectsDetailsService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getUserProjects();
  }

  getUserProjects() {
    this.loadingService.loadingSubject.next(true);
    this.projectDetailsService.getUserProjects().subscribe((response: projectModel[]) => {
      this.projectsList = response;
      this.loadingService.loadingSubject.next(false);
    });
  }
}
