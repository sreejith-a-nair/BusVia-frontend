import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import { User } from '../user.model';

const BASE_URL=["http://localhost:8080/"];
@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
 

  loginForm: any;

  constructor(private  http :HttpClient) {}


  register(signRequest:any):Observable<any>{
    return this.http.post(BASE_URL+'signup',signRequest)
   }


  login(loginRequest:any):Observable<any>{
    console.log("SERVICE LOGIN>>>>>>>>>>>>>>>>>>>>>"+loginRequest);
    
    return this.http.post(BASE_URL+'login', loginRequest)
  }

  logout():void{
    localStorage.removeItem('jwt');
    this.http.post(BASE_URL + 'logout',{});
  }

  extractRole(): string | null {

    const jwtTok = localStorage.getItem('jwt');
    
    console.log("extractRole   ...", jwtTok);
    if (jwtTok) {
      try {
        const decodedToken: any = jwt_decode.jwtDecode(jwtTok as string);
        console.log("DEcoded    ...", decodedToken.role);
        const role = decodedToken.role;
        return role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.log('Token not found in localStorage');
      return null;
    }
  }


  getAllUsers(): Observable<any>{
    const jwtToken = localStorage.getItem('jwt');
   const roll :String|null=this.extractRole()
   console.log("ROLE IS    : "+roll);

    if(this.extractRole()==='[ROLE_ADMIN]'){
      console.log("GETALL USER Role ADMIn  >>>>>>>>>");
      
      return this.http.get(BASE_URL + 'admin/users', {
        headers: this.createAuthorizationHeader()
      });
    } else {
      console.log("GETALL USER  FAiled  **************")
      
      return Of(null);
    }
  }


  getUserProfile(): Observable<any>{
    return this.http.get(BASE_URL + 'api/profile', {
      headers: this.createAuthorizationHeader()
    });
}

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(BASE_URL + 'admin/delete/' +userId, 
    {headers: this.createAuthorizationHeader() });
  }
  

  hello():Observable<any>{
    return this.http.get(BASE_URL+"api/hello",
    {headers:this.createAuthorizationHeader() })
  }




  private createAuthorizationHeader():HttpHeaders{
    const jwtToken=localStorage.getItem('jwt');
    if(jwtToken){
      console.log("Jwt Token found in local storage",jwtToken);
      return new HttpHeaders().set(
        "Authorization","Bearer "+jwtToken
      )
      
    }else{
      console.log("Jwt Token not found in local storage",jwtToken);
    }
    return new HttpHeaders();

  }

  observable = new Observable ((data)=>{
    data.next("data");
  })
  
  updateUserDetails(userId: number, updatedUserData: any): Observable<any> {
    console.log("Service layer in angular ...1");
    
    const url = `admin/edit-user/${userId}`;
    const headers = this.createAuthorizationHeader();
    
    console.log("Service layer in angular url ...2", url, "  headre ", headers);
    
    return this.http.put<User>(url, updatedUserData, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating user details:', error);
        if (error.status === 401 && error.error.message === 'JWT expired') {
          console.log('Token expired. Redirecting to login.');
          window.location.href = '/login';
        }
        console.log('url issue.');
        return throwError(error);
      })
    );
  }
  

}
function Of(arg0: null): Observable<any> {
  throw new Error('Function not implemented.');
}

