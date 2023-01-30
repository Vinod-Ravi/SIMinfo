import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';/*imported for dialog closing */

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  serviceProviderList = ["Reliance Jio", "Idea", "Vodafone", "Airtel"];
  simInfoForm !: FormGroup;
  SaveOrUpdateBtn: string = "Save";
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any)/*injecting api service and injecting MatDialogRef*/ { }
  ngOnInit(): void {
    this.simInfoForm = this.formBuilder.group({
      aoc: ['', Validators.required],
      ki: ['', Validators.required],
      mcc: ['', Validators.required],
      lai: ['', Validators.required],
      spn: ['', Validators.required],
      iccid: ['', Validators.required],
      vas: ['', Validators.required],
      date: ['', Validators.required]
    })

    /* when click on edit data **starts
    console.log(this.editData);*/
    if (this.editData) {
      this.SaveOrUpdateBtn = "Update";/*when user click on edit changing name of button to Update */
      this.simInfoForm.controls['aoc'].setValue(this.editData.aoc);
      this.simInfoForm.controls['ki'].setValue(this.editData.ki);
      this.simInfoForm.controls['mcc'].setValue(this.editData.mcc);
      this.simInfoForm.controls['lai'].setValue(this.editData.lai);
      this.simInfoForm.controls['spn'].setValue(this.editData.spn);
      this.simInfoForm.controls['iccid'].setValue(this.editData.iccid);
      this.simInfoForm.controls['vas'].setValue(this.editData.vas);
      this.simInfoForm.controls['date'].setValue(this.editData.date);
    }
    /*end */
  }
  SaveOrUpdate() {
    if (!this.editData)/* when it is save action performed by user*/ {
      this.AddInformation()
    }
    else {
      this.UpdateInformation();
    }
  }
  AddInformation() {

    /*alert(1);*/
    /*console.log(this.simInfoForm.value);
    alert(this.simInfoForm.valid);
   if(this.simInfoForm.valid)
   {*/
    this.api.postSimInfo(this.simInfoForm.value)
      .subscribe({
        next: (res) => {
          /*if sucess then will execute the next block*/
          /* alert(2);*/
          alert("Sim Information saved Sucessfully");
          this.simInfoForm.reset();
          this.dialogref.close('save');/*passing this data ('save') to siminformation.component and this value is used to refresh table based on condition */
        },
        error: () => {
          alert("Error occured while save data!!");
        }
      })

  }
  /*}*/
  UpdateInformation() {
    this.api.putSimInfo(this.simInfoForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Sim information updated Sucessfully");
          this.simInfoForm.reset();
          this.dialogref.close('update');/*passing this data ('update') to siminformation.component and this value is used to refresh table based on condition */
        }, error: () => {
          alert("Error occured while updating data!!");
        }
      })
  }
}

