import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Siminformation } from '../models/interface/siminformation.model';
import { headerNameForSimInfo } from '../shared/common/displaynames'
import { Redirection } from '../models/interface/redirection.model';

@Component({
  selector: 'app-siminformation',
  templateUrl: './siminformation.component.html',
  styleUrls: ['./siminformation.component.scss']
})
export class SiminformationComponent implements OnInit, Redirection {
  title = 'SIM Info';
  displayedColumns: string[] = headerNameForSimInfo;
  dataSource!: MatTableDataSource<Siminformation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private simInfoApi: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSimInformation();
  }
  openDialog() {

    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getSimInformation();
      }
    })
  }
  redirectToComponent(url: string) {
    this.router.navigateByUrl(url);
  }
  getSimInformation() {
    this.simInfoApi.getSimInfo().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching data!!");
      }
    })
  }
  editSimInfo(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getSimInformation();
      }
    })
  }
  deleteSimInfo(id: number) {
    this.simInfoApi.deleteSimInfo(id).subscribe({
      next: (res) => {
        alert("Sim information deleted sucessfully");
        this.getSimInformation();
      },
      error: () => {
        alert("Error while deleting the product!!!");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

