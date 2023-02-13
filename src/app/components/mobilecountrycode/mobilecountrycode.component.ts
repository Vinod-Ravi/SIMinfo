import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcountrycodeComponent } from '../dialogcountrycode/dialogcountrycode.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { headerNameForMobileCountryCode } from '../../shared/common/displaynames'
import { Mobilecountrycode } from '../../models/interface/mobilecountrycode.model';
import { Common } from '../../models/interface/common.model';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mobilecountrycode',
  templateUrl: './mobilecountrycode.component.html',
  styleUrls: ['./mobilecountrycode.component.scss']
})
export class MobilecountrycodeComponent implements OnInit, Common, Mobilecountrycode {
  title = 'SIM info';
  displayedColumns: string[] = headerNameForMobileCountryCode;
  dataSource!: MatTableDataSource<Mobilecountrycode>;
  countryCodeList!: Mobilecountrycode[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private simInfoApi: ApiService,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService) { }

  id!: string;
  countryCode!: string;
  countryName!: string;
  codeName!: string;

  ngOnInit(): void {
    this.getMobileCountryCode();
  }
  openDialog() {

    this.dialog.open(DialogcountrycodeComponent, {
      width: '30%',
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getMobileCountryCode();
      }
    })
  }
  redirectToComponent(url: string) {
    if (url == '/login')
      this.auth.signOut();
    this.router.navigateByUrl(url);
  }
  getMobileCountryCode() {
    this.simInfoApi.getMobileCountryCodes().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.toast.error({ detail: "ERROR", summary: "Error occured while fetching data!!", duration: 5000 });
      }
    })
  }
  editCountryCode(row: any) {
    this.dialog.open(DialogcountrycodeComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getMobileCountryCode();
      }
    })
  }
  deleteCountryCode(id: number) {
    this.simInfoApi.deleteMobileCountryCode(id).subscribe({
      next: (res) => {
        if (res.success == true)
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
        else
          this.toast.error({ detail: "ERROR", summary: res.message, duration: 5000 });
        this.getMobileCountryCode();
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


