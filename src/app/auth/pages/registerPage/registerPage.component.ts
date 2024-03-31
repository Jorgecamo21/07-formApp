
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './registerPage.component.html',
    styles: `
    :host {
      display: block;
    }
  `
})
export class RegisterPageComponent  {
  public myForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['',[Validators.required,Validators.pattern(this.validatorsService.emailPattern)]],
    username: ['',[Validators.required, this.validatorsService.cantBeStrider]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required,Validators.minLength(6)]],
  }, {
    validators: [
      this.validatorsService.areEquals('password','password2'),
    ]
  });

  constructor(private fb: FormBuilder,
    private validatorsService:ValidatorsService){}
  isValidField(field:string){
    return this.validatorsService.isValidField(this.myForm,field)
  }


  onSave(){
    this.myForm.markAllAsTouched();
  }
}
