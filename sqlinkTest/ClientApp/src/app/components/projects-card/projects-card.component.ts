import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { projectModel } from 'src/app/models/projectModel';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectsDetailsService } from 'src/app/services/projects-details.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];




@Component({
  selector: 'app-projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.scss']
})

export class ProjectsCardComponent implements OnInit {
  
  projectsList: projectModel[];
  // dataSource: projectModel[];
  dataSource = ELEMENT_DATA;

  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;

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
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.getUserProjects();
    // this.createTable();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;

  }

  // createTable() {
  //   let tableArr: Element[] = [{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  //   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  //   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  //   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  //   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  //   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  //   ];
  //   this.dataSource = new MatTableDataSource(tableArr);
  //   this.dataSource.sort = this.sort;
  // }


  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  getUserProjects() {
    this.loadingService.loadingSubject.next(true);
    this.projectDetailsService.getProjectsByUserId().subscribe((response: projectModel[]) => {
      this.projectsList = response;
      // this.dataSource = this.projectsList;
      // this.dataSource.sort = this.sort;
      this.loadingService.loadingSubject.next(false);
    });
  }
}
