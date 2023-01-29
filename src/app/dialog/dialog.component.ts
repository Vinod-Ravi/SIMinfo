import { Component, OnInit  } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef} from '@angular/material/dialog';/*imported for dialog closing */

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
serviceProviderList=["Reliance Jio","Idea","Vodafone","Airtel"];
simInfoForm !: FormGroup;
constructor(private formBuilder:FormBuilder,private api:ApiService,private dialogref:MatDialogRef<DialogComponent>)/*injecting api service and injecting MatDialogRef*/ 
{}
ngOnInit(): void {
this.simInfoForm=this.formBuilder.group({
  aoc:['',Validators.required],
  ki:['',Validators.required],
  mcc:['',Validators.required],
  lai:['',Validators.required],
  spn:['',Validators.required],
  iccid:['',Validators.required],
  vas:['',Validators.required],
  date:['',Validators.required]
})
}
AddInformation()
{
  /*alert(1);*/
  /*console.log(this.simInfoForm.value);
  alert(this.simInfoForm.valid);
 if(this.simInfoForm.valid)
 {*/
  this.api.postSimInfo(this.simInfoForm.value)
    .subscribe({
    next:(res)=>{
      /*if sucess then will execute the next block*/
     /* alert(2);*/
alert("Sim Information saved Sucessfully");
this.simInfoForm.reset();
this.dialogref.close('save');
    },
    error:() =>{
      alert("Error occured while save data!!");
    }
  })
}
/*}*/
}

