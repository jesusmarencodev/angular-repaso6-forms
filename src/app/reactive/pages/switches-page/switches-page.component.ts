import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.scss']
})
export class SwitchesPageComponent implements OnInit {

  public myForm:FormGroup = this.fb.group({
    gender:['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termAndConditions:[false, Validators.requiredTrue],
  });

  public person = {
    gender : 'F',
    wentNotifications:false
  }


  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  onSave():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return;
    }
    const { termAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;

    console.log(this.myForm.value)
    console.log(this.person)
  }

  
  isValidField(field: string):boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }


}
