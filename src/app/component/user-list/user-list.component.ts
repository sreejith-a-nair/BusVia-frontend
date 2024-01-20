import { Component } from '@angular/core';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/state/user.action';
import { getuserlist } from 'src/app/state/user.selector';
import { User } from 'src/app/user.model';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {


  users: any[] = [];
  private _dialog: any;

  constructor(private jwtService: JwtServiceService, private store:Store,private dialog: MatDialog ) {}

 
  ngOnInit() {
    this.store.dispatch(loadUser());
    this.store.select(getuserlist).subscribe(item=>{
      this.users = item;
      console.log(this.users);
    });
  }

  onDeleteUser(userId: number) {
    this.jwtService.deleteUser(userId).subscribe(
      () => {
        console.log("user deleted successfully");
        location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUser(user:User) {
    console.log("User data (    )" ,user);
    
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
    });
  }


}

