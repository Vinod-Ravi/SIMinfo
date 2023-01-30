import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-siminformation',
  templateUrl: './siminformation.component.html',
  styleUrls: ['./siminformation.component.scss']
})
export class SiminformationComponent implements OnInit {
  title = 'AngularCrud';
  displayedColumns: string[] = ['aoc', 'ki', 'mcc', 'lai', 'spn', 'iccid', 'vas', 'date', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.GetSimInformation();
  }
  OpenDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.GetSimInformation();/*this statement will update the table after save, no manual refresh needed */
      }
    })
  }
  GoToHome() {
    this.router.navigateByUrl('/navigation');
  }
  GetSimInformation() {
    this.api.getSimInfo().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator; /*comes from @ViewChild(MatPaginator) paginator!: MatPaginator;*/
        this.dataSource.sort = this.sort;/*comes from  @ViewChild(MatSort) sort!: MatSort;*/
      },
      error: (err) => {
        alert("Error while fetching data!!");
      }
    })
  }
  EditSimInfo(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.GetSimInformation();/*this statement will update the table after update, no manual refresh needed */
      }
    })
  }
  DeleteSimInfo(id: number) {
    this.api.deleteSimInfo(id).subscribe({
      next: (res) => {
        alert("Sim information deleted sucessfully");
        this.GetSimInformation();/*this statement will update the table after delete, no manual refresh needed */
      },
      error: () => {
        alert("Error while deleting the product!!!");
      }
    })
  }
  ApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

