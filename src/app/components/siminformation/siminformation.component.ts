import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Siminformation } from '../../models/interface/siminformation.model';
import { headerNameForSimInfo } from '../../shared/common/displaynames'
import { Common } from '../../models/interface/common.model';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-siminformation',
  templateUrl: './siminformation.component.html',
  styleUrls: ['./siminformation.component.scss']
})
export class SiminformationComponent implements OnInit, Common, Siminformation {
  title = 'SIM Info';
  displayedColumns: string[] = headerNameForSimInfo;
  dataSource!: MatTableDataSource<Siminformation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private simInfoApi: ApiService,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  id!: string;
  adviceOfCharge!: string;
  authenticationKey!: string;
  mobileCountryCode!: string;
  localAreaIdentity!: string;
  pserviceProviderName!: string;
  integratedCircuitCardId!: string;
  valueAddedServices!: string;
  createdDate!: Date;
  createdUser!: string;

  ngOnInit(): void {
    this.getSimInformation();
  }
  openDialog() {

    this.dialog.open(DialogComponent, {
      width: '30%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getSimInformation();
      }
    })
  }
  redirectToComponent(url: string) {
    if (url == '/login')
      this.auth.signOut();
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
        if (this.auth.isLoggedIn())
          this.toast.error({ detail: "ERROR", summary: "Error occured while fetching data!!", duration: 5000 });
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
        if (res.success == true)
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
        else
          this.toast.error({ detail: "ERROR", summary: res.message, duration: 5000 });

        this.getSimInformation();
      },
      error: () => {
        this.toast.error({ detail: "ERROR", summary: "Error occured while deleting data!!", duration: 5000 });
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

