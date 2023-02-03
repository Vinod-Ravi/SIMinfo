import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Redirection } from '../models/interface/redirection.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, Redirection {
  constructor(private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  username = "";
  password = "";

  redirectToComponent(url: string) {
    this.router.navigateByUrl(url);
  }
}
