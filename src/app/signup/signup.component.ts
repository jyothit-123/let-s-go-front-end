import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private route:Router) { }

  genderList:any=[{key:'Female',value:'F'},{key:'Male',value:'M'},{key:'Others',value:'O'}]
  passwordTextType: boolean=false;
  cPasswordTextType:boolean=false;
  togglepasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  togglecPasswordTextType() {
    this.cPasswordTextType = !this.cPasswordTextType;
  }

  signupForm!:FormGroup
  ngOnInit(): void {
    this.signupForm=this.fb.group({
      fName:['', [Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z\s]{1,}$/)]],
      lName:['',Validators.required],
      dateOfBirth:['',[Validators.required,this.dateValidator]],
      gender:['',Validators.required],
      contactNumber:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      cPassword:['',Validators.required],
    },{validator: this.passwordMatchValidator})
  }

  dateValidator(control: FormControl) {
    if (control.value) {
      const date = new Date(control.value);
      const today = new Date()
      if (date>=(today)) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['cPassword'].value ? null : {'mismatch': true};
  }

 signUp(){
    if(this.signupForm.valid){
      this.route.navigate(["login"]);
    }
  }

}
