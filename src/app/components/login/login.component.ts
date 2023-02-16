import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Common } from '../../models/interface/common.model';
import { UserregistrationComponent } from '../userregistration/userregistration.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, Common {
  authenticationForm !: FormGroup;
  userName: any;
  password: any;

  constructor(private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.authenticationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  redirectToComponent(url: string) {
    this.router.navigateByUrl(url);
  }
  openDialog() {
    this.dialog.open(UserregistrationComponent, {
      width: '30%',
      disableClose: true
    });
  }
  applyFilter(event: Event) { }
  
  userAuthentication() {
    this.api.checkUserAuthentication(this.authenticationForm.value).subscribe({
      next: (res) => {
        if (res.success == true) {
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
          this.redirectToComponent('/navigation');
        }
        else {
          this.toast.error({ detail: "ERROR", summary: res.message, duration: 5000 });
        }
      },
      error: (err) => {
        this.toast.error({ detail: "ERROR", summary: "Error while Login!!", duration: 5000 });
      }
    })
  }
}
