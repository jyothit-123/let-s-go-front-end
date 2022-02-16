import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LetsgoService } from '../letsgo.service';
import { LoginReq } from '../Model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private route:Router,private server:LetsgoService) { }
  
  errorMsg=''
  spinner=false;
  loginForm!: FormGroup; 
  loginUI:LoginReq = new LoginReq();

  login(){
    if(this.loginForm.valid){
      this.loginUI.emaiId=this.loginForm.get('email')?.value;
      this.loginUI.password=this.loginForm.get('password')?.value;
      this.spinner=true;
      this.server.login(this.loginUI).subscribe(res=>{
        if(res.status=== "Success"){
          this.spinner=false;
          this.errorMsg=''
          this.route.navigate(['home'])
        }else{
          this.spinner=false;
          this.errorMsg="Login Failed!! please validate the credentials!!"
        }
      },error=>{
        this.spinner=false;
        this.errorMsg="Login Failed!! please validate the credentials!!"
      });  
    }
  }
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

}
