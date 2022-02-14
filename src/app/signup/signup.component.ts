import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private route:Router) { }

  FirstName:string=" "
  signupForm!:FormGroup
  ngOnInit(): void {
    this.signupForm=this.fb.group({
      fName:['', [Validators.required,Validators.minLength(2)]],
      lName:['',Validators.required],
      dateOfBirth:['',Validators.required],
      contactNumber:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      cPassword:['',Validators.required],
    })
  }
  signUp(){
    if(this.signupForm.valid){
      this.route.navigate(["login"]);
    }
  }

}
