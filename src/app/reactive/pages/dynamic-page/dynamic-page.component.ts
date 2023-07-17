import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
})
export class DynamicPageComponent {
  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['metal Gear', Validators.required],
      ['death Stranding', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder) {}

  get listGames() {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }
  isValidField(field: string): boolean | null {
    return (
      this.dynamicForm.controls[field].errors &&
      this.dynamicForm.controls[field].touched
    );
  }
  getFieldError(field: string): string | null {
    if (!this.dynamicForm.controls[field]) return null;
    const errors = this.dynamicForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `must have at least ${errors['minlength'].requiredLength} characters`;
      }
    }

    return null;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  onDeleteFavorite(index: number): void {
    this.listGames.removeAt(index);
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    //with out formBuilder
    //this.listGames.push(new FormControl(newGame, Validators.required));
    //with formBuilder
    this.listGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();

    (this.dynamicForm.controls['favoriteGames'] as FormArray) = this.fb.array(
      []
    );
  }

  onSubmit(): void {
    if (this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log(this.dynamicForm.value);

    this.dynamicForm.reset();
  }
}
