import { Component, DoCheck } from '@angular/core';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{


  title = 'jwt-front';

  jwtTok!:string | null;
  isLogged: boolean=false;
  isAdmin: boolean=false;
  role:null| string='';

  constructor(private jwtService: JwtServiceService){}



  ngDoCheck(): void {
  
      
      this.jwtTok = localStorage.getItem('jwt');
      console.log("local storage >>>>>>>>>",this.jwtTok);
      if (this.jwtTok != null) {
        this.isLogged = true;
        this.role = this.jwtService.extractRole();
        console.log("Role is .....................",this.role)
        if (this.role === '[ROLE_ADMIN]') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isLogged = false;
        this.isAdmin = false;
    }
  }


}
