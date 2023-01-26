import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { projectModel } from 'src/app/models/projectModel';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectsDetailsService } from 'src/app/services/projects-details.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class ProjectsCardComponent implements OnInit {
  dataSource = new MatTableDataSource<projectModel>();
  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  average: number = 0;
  deadlineCompliance: number = 0;
  columnNames = [{
    id: 'name',
    value: 'name',

  }, {
    id: 'score',
    value: 'score',
  },
  {
    id: 'durationInDays',
    value: 'durationInDays',
  },
  {
    id: 'bugsCount',
    value: 'bugsCount',
  },
  {
    id: 'madeDadeline',
    value: 'madeDadeline',
  }];
  constructor(private projectDetailsService: ProjectsDetailsService,
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.getUserProjects();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.average = this.calculateAverage(this.dataSource.filteredData);
    this.deadlineCompliance = this.calculateDeadlineCompliancePercentage(this.dataSource.filteredData);
  }

  getUserProjects() {
    this.loadingService.loadingSubject.next(true);
    this.projectDetailsService.getProjectsByUserId().subscribe((response: projectModel[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.average = this.calculateAverage(response);
      this.deadlineCompliance = this.calculateDeadlineCompliancePercentage(response);
      this.loadingService.loadingSubject.next(false);
      this.cdRef.detectChanges();
    });
  }

  calculateAverage(model: projectModel[]): number {
    return model.length > 0 ? model.map(p => p.score).reduce((a, b) => a + b, 0) / model.length : 0;
  }

  calculateDeadlineCompliancePercentage(model: projectModel[]): number {
    return model.length > 0 ? model.filter(p => p.madeDadeline).length * 100 / model.length : 0
  }
}
