import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm!:FormGroup;
  // router: any;

  constructor(private service :JwtServiceService,private fb :FormBuilder, private router: Router){   }

  ngOnInit(): void {  
    console.log("REGISTER IN ANGULAR user "+this.registerForm);
    
    this.registerForm=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
    },
    {validator:this.passwordMathValidator})

  }
  passwordMathValidator(formGroup:FormGroup){
    const password=formGroup.get('password')?.value;
    const confirmPassword=formGroup.get('confirmPassword')?.value;
    if(password!=confirmPassword){
      formGroup.get('confirmPassword')?.setErrors({passwordMismatch:true})
    }else{
      formGroup.get('confirmPassword')?.setErrors(null)
    }

  }

  submitForm(){
    // console.log(this.registerForm?.value);
       this.service.register(this.registerForm.value).subscribe((res)=>{
        console.log("submit woked  ");
        if(res!=null){
          console.log("log success");
          this.router.navigateByUrl('login');
        }else{
          console.log("log error");
          
        }
      
    },
    (error) => {
      console.error("HTTP request failed", error);
      // Handle error scenario, if needed
    })
  }


}
