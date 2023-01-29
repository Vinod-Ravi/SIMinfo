import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { ApiService } from '../services/api.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-siminformation',
  templateUrl: './siminformation.component.html',
  styleUrls: ['./siminformation.component.scss']
})
export class SiminformationComponent implements OnInit{
  title = 'AngularCrud';
  displayedColumns: string[] = ['aoc', 'ki', 'mcc', 'lai','spn','iccid','vas','date'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private api: ApiService, private router:Router) 
  {}
  ngOnInit(): void {
   this.getSimInformation();
  }
  openDialog() {
   this.dialog.open(DialogComponent,{
    width:'30%'
   });
  }
  GoToHome()
  {
   this.router.navigateByUrl('/navigation');
  }
  getSimInformation()
  {
    this.api.getSimInfo().subscribe({
      next:(res)=>{
        /*console.log(res);*/
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator; /*comes from @ViewChild(MatPaginator) paginator!: MatPaginator;*/
        this.dataSource.sort=this.sort;/*  comes from  @ViewChild(MatSort) sort!: MatSort;  */
      },
      error:(err)=>
      {
        alert("Error while fetching data!!");
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

