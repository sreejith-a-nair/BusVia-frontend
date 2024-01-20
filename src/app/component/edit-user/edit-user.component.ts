import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/user.model';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { loadUser } from 'src/app/state/user.action';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {


  user!:User;
  editForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:User,
    private _dialogRef:MatDialogRef<EditUserComponent>,
    private fb: FormBuilder,
    private userService: JwtServiceService ,
    private _store:Store
    ){

      if(data){

      this.editForm = this.fb.group({
        name: [this.data.name, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
  })
  };
}

  
  onSaveChanges() {

    console.log('User details updated ');
    if (this.editForm.valid) {
      const userId = this.data.id; 
      const updatedUserData = this.editForm.value;
      console.log('User details updated if ');
      
     
      this.userService.updateUserDetails(userId, updatedUserData).subscribe(
        (response) => {
          console.log('User details updated successfully:', response);
          //  close the dialog 
          this._dialogRef.close(response);
          this._store.dispatch(loadUser());
        },
        (error) => {
          console.error('Error updating user details:', error);
         
        }
      );
    }
  }


}
