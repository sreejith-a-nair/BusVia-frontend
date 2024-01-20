import { Component } from '@angular/core';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private jwtService: JwtServiceService,
    private router: Router){}

  ngOnInit(): void {
      this.jwtService.logout();
      this.router.navigateByUrl("/login");
  }
}
