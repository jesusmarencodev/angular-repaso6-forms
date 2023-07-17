import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const rtx5090 = {
  name: 'RTC 5090',
  price: 2500,
  inStorage: 2500,
};

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.scss'],
})
export class BasicPageComponent implements OnInit {
  //Way form Group
  /*   public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(),
  }); */

  //Way FormBuilder
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //Initialize forms
    // this.myForm.reset(rtx5090);
  }

  isValidField(field: string):boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  getFieldError(field:string):string | null{
    if(!this.myForm.controls[field]) return null;
    const errors =  this.myForm.controls[field].errors || {}; 

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'This field is required'
        case 'minlength':
          return `must have at least ${errors['minlength'].requiredLength} characters`
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    //does'nt is necessary restore strings
    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
