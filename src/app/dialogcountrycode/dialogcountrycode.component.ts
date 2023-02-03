import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogcountrycode',
  templateUrl: './dialogcountrycode.component.html',
  styleUrls: ['./dialogcountrycode.component.scss']
})
export class DialogcountrycodeComponent implements OnInit {

  countryCodeForm !: FormGroup;
  SaveOrUpdateBtn: string = "Save";
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogref: MatDialogRef<DialogcountrycodeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private simInfoApi: ApiService) { }
  ngOnInit(): void {
    this.countryCodeForm = this.formBuilder.group({
      countryCode: ['', Validators.required],
      countryName: ['', Validators.required]
    })
    if (this.editData) {
      this.SaveOrUpdateBtn = "Update";
      this.countryCodeForm.controls['countryCode'].setValue(this.editData.countryCode);
      this.countryCodeForm.controls['countryName'].setValue(this.editData.countryName);
    }
  }
  saveOrUpdate() {
    if (!this.editData) {
      this.addCountryCode()
    }
    else {
      this.updateCountryCode();
    }
  }
  addCountryCode() {
    this.api.postMobileCountryCode(this.countryCodeForm.value)
      .subscribe({
        next: (res) => {
          alert("Mobile country code saved Sucessfully");
          this.countryCodeForm.reset();
          this.dialogref.close('save');
        },
        error: () => {
          alert("Error occured while saving data!!");
        }
      })
  }
  updateCountryCode() {
    this.api.putMobileCountryCode(this.countryCodeForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Sim information updated Sucessfully");
          this.countryCodeForm.reset();
          this.dialogref.close('update');
        }, error: () => {
          alert("Error occured while updating data!!");
        }
      })
  }
}


