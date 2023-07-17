import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider } from 'src/app/shared/validators/helpers';
import { ValidatorService } from '../../../shared/services/validator.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
      [this.emailValidator.validate],
    ],
    username: ['', [Validators.required, cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    // level of form
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidator
  ) {}

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSave(): void {
    console.log(this.myForm.value);
  }
}
