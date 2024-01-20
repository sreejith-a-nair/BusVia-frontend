import { Component } from '@angular/core';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {


  users: any;

  constructor(private jwtService: JwtServiceService) {}

  ngOnInit() {
    this.jwtService.getUserProfile().subscribe(
      (data: any) => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}
