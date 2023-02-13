import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { serviceProviderName } from '../../shared/common/displaynames'
import { Mobilecountrycode } from '../../models/interface/mobilecountrycode.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  serviceProviderList = serviceProviderName;
  countryCodeList!: Mobilecountrycode[];
  simInfoForm !: FormGroup;
  SaveOrUpdateBtn: string = "Save";
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private simInfoApi: ApiService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.getMobileCountryCodes();
    this.simInfoForm = this.formBuilder.group({
      adviceOfCharge: ['', Validators.required],
      authenticationKey: ['', Validators.required],
      mobileCountryCode: ['', Validators.required],
      localAreaIdentity: ['', Validators.required],
      serviceProviderName: ['', Validators.required],
      integratedCircuitCardId: ['', Validators.required],
      valueAddedServices: ['', Validators.required],
      createdDate: ['', Validators.required]
    })

    if (this.editData) {
      this.SaveOrUpdateBtn = "Update";
      this.simInfoForm.controls['adviceOfCharge'].setValue(this.editData.adviceOfCharge);
      this.simInfoForm.controls['authenticationKey'].setValue(this.editData.authenticationKey);
      this.simInfoForm.controls['mobileCountryCode'].setValue(this.editData.mobileCountryCode);
      this.simInfoForm.controls['localAreaIdentity'].setValue(this.editData.localAreaIdentity);
      this.simInfoForm.controls['serviceProviderName'].setValue(this.editData.serviceProviderName);
      this.simInfoForm.controls['integratedCircuitCardId'].setValue(this.editData.integratedCircuitCardId);
      this.simInfoForm.controls['valueAddedServices'].setValue(this.editData.valueAddedServices);
      this.simInfoForm.controls['createdDate'].setValue(this.editData.createdDate);
    }
  }
  getMobileCountryCodes() {
    this.simInfoApi.getMobileCountryCodes().subscribe({
      next: (res) => {
        this.countryCodeList = res;
      },
      error: (err) => {
        this.toast.error({ detail: "ERROR", summary: "Error while fetching data!!", duration: 5000 });
      }
    })
  }
  saveOrUpdate() {
    if (!this.editData)
      this.addInformation()
    else
      this.updateInformation();
  }
  addInformation() {
    this.api.postSimInfo(this.simInfoForm.value)
      .subscribe({
        next: (res) => {
          if (res.success == true)
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
          else
            this.toast.error({ detail: "ERROR", summary: res.message, duration: 5000 });
          this.simInfoForm.reset();
          this.dialogref.close('save');
        },
        error: () => {
          this.toast.error({ detail: "ERROR", summary: "Error occured while save data!!", duration: 5000 });
        }
      })
  }
  updateInformation() {
    this.api.putSimInfo(this.simInfoForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          if (res.success == true)
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
          else
            this.toast.error({ detail: "ERROR", summary: res.message, duration: 5000 });
          this.simInfoForm.reset();
          this.dialogref.close('update');
        }, error: () => {
          this.toast.error({ detail: "ERROR", summary: "Error occured while updating data!!", duration: 5000 });
        }
      })
  }
}

