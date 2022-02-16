import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LetsgoService } from '../letsgo.service';
import { SignupUI } from '../Model/signupReq';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private route:Router, private server:LetsgoService) { }

  spinner:boolean=false;
  genderList:any=[{key:'Female',value:'F'},{key:'Male',value:'M'},{key:'Others',value:'O'}]
  passwordTextType: boolean=false;
  cPasswordTextType:boolean=false;
  errormessage=''
  togglepasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  togglecPasswordTextType() {
    this.cPasswordTextType = !this.cPasswordTextType;
  }

  signupForm!:FormGroup
  signupData:SignupUI=new SignupUI();

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
      this.signupData.firstName=this.signupForm.get('fName')?.value;
      this.signupData.lastName=this.signupForm.get('lName')?.value;
      this.signupData.dateOfBirth=this.signupForm.get('dateOfBirth')?.value;
      this.signupData.gender=this.signupForm.get('gender')?.value;
      this.signupData.contactNumber=this.signupForm.get('contactNumber')?.value;
      this.signupData.emaiId=this.signupForm.get('email')?.value;
      this.signupData.password=this.signupForm.get('password')?.value;
      this.signupData.confirmPassword=this.signupForm.get('cPassword')?.value;
      this.spinner=true
      this.server.signup(this.signupData).subscribe(success=>{
          console.log(success);
          this.spinner=false
          this.errormessage=''
          this.route.navigate(["login"]);   
      }, error => {
        this.spinner=false
        console.error('Error');
        this.errormessage="Sign up Failed...!! Please validate the data you have entered..!!"
      })
    }
  }

}
