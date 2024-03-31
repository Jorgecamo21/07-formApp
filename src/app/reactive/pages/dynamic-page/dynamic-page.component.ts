import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

public myForm:FormGroup = this.fb.group({
  name:['',[Validators.required,Validators.minLength(3)]],
  favoriteGames: this.fb.array([
    ['Metal Gear',Validators.required],
    ['Death',Validators.required],

  ])
});

public newFavorite:FormControl = new FormControl('',Validators.required);

get favouriteGame(){
  return this.myForm.get('favoriteGames') as FormArray;
}

isValidField(field: string): boolean | null {
  return (
    this.myForm.controls[field].getError('required') &&
    this.myForm.controls[field].touched
  );
}

getFieldError(field: string): string | null {
  if (!this.myForm.controls[field]) return null;
  const errors = this.myForm.controls[field].errors || {};

  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'Este campo es requerido';

      case 'minlength':
        return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
    }
  }
  return null;
}

isValidFieldInArray(formArray:FormArray,i:number){
 return formArray.controls[i].errors &&
  formArray.controls[i].touched;
}

constructor (private fb:FormBuilder){}


onDeleteFavorite(i:number):void{
  this.favouriteGame.removeAt(i);
}

addToFavorites():void{
  if(this.newFavorite.invalid) return;
  const newGame = this.newFavorite.value;


  this.favouriteGame.push(this.fb.control(newGame,Validators.required));
  this.newFavorite.reset();
}
onSubmit():void{
  if(this.myForm.invalid){
    this.myForm.markAllAsTouched();
    return;
  }
  (this.myForm.controls['favoriteGame'] as FormArray) = this.fb.array([]);
  this.myForm.reset();
}
}
