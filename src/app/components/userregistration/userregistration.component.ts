import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.scss']
})
export class UserregistrationComponent implements OnInit {

  userRegistrationForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogref: MatDialogRef<UserregistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public signupData: any,
    private toast: NgToastService
  ) { }
  ngOnInit(): void {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  }
  submitUserRegistration() {
    if (this.userRegistrationForm.controls['password'].value != this.userRegistrationForm.controls['confirmPassword'].value) {
      this.toast.error({ detail: "ERROR", summary: "Password and Confirm Password should match", position: 'toast-left-top error', duration: 5000 });
      return;
    }
    this.api.postUserRegistration(this.userRegistrationForm.value)
      .subscribe({
        next: (res) => {
          if (res.success == true) {
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
            this.userRegistrationForm.reset();
            this.dialogref.close();
          }
          else
            this.toast.error({ detail: "ERROR", summary: res.message, duration: 5000 });
        },
        error: () => {
          this.toast.error({ detail: "ERROR", summary: "Error in login", duration: 5000 });
        }
      })
  }
}


