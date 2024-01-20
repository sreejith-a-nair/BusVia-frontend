import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
 
  constructor(private service: JwtServiceService,
              private formBuilder: FormBuilder,
              private router :Router){   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  submitForm() {

    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(response=>{
     
      if (response.jwtToken) {
    
        // alert("Hello, your token is " + response.jwtToken);
        const jwtToken = response.jwtToken;
        localStorage.setItem("jwt", jwtToken);
        console.log("JWT Token : in variable :  ", jwtToken);
        this.router.navigateByUrl("/dashboard");
      } 
    },err=>{
      console.log("Error ..",err);
      
    })

  }



}
