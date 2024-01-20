import { Component } from '@angular/core';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private service: JwtServiceService ){}
  message: string | undefined;

  ngOnInit(){
    this.hello();
  }

  hello(){
    this.service.hello().subscribe(
      (response) => {
        console.log(response);
        this.message = response.message;
      }
    )
  }

}
