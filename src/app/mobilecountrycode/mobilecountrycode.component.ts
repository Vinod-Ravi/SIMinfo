import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcountrycodeComponent } from '../dialogcountrycode/dialogcountrycode.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { headerNameForMobileCountryCode } from '../shared/common/displaynames'
import { Mobilecountrycode } from '../models/interface/mobilecountrycode.model';
import { Redirection } from '../models/interface/redirection.model';

@Component({
  selector: 'app-mobilecountrycode',
  templateUrl: './mobilecountrycode.component.html',
  styleUrls: ['./mobilecountrycode.component.scss']
})
export class MobilecountrycodeComponent implements OnInit, Redirection {
  title = 'SIM info';
  displayedColumns: string[] = headerNameForMobileCountryCode;
  dataSource!: MatTableDataSource<Mobilecountrycode>;
  countryCodeList!: Mobilecountrycode[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private simInfoApi: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMobileCountryCode();
  }
  openDialog() {

    this.dialog.open(DialogcountrycodeComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getMobileCountryCode();
      }
    })
  }
  redirectToComponent(url: string) {
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
        alert("Error while fetching data!!");
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
        alert("Sim information deleted sucessfully");
        this.getMobileCountryCode();
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


