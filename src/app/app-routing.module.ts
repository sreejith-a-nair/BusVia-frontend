import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './AuthGuard';
import { LogoutComponent } from './component/logout/logout.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: 'full'},
  { path: "dashboard", component: DashboardComponent , canActivate: [AuthGuard]},
  {path:"register" ,component:RegisterComponent},
  {path:"login",component:LoginComponent},
  { path: "logout", component: LogoutComponent},
  { path: "user-list", component: UserListComponent},
  { path: "user-profile", component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
