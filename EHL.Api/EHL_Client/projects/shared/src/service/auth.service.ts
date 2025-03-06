import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('EHL_TOKEN');
    return token ? true : false;
  }
  setUserDetails(user){
    localStorage.setItem("EHL_RoleType",user.roleType);
    localStorage.setItem("EHL_UserName",user.userName);
    localStorage.setItem("EHL_RoleId",user.roleId);
  }
  setToken(token:string){
    localStorage.setItem("EHL_TOKEN",token);
  }

  getToken(){
    return localStorage.getItem("EHL_TOKEN");
  }
  getUserName(){
    return localStorage.getItem("EHL_UserName");
  }
  getRoleType(){
    return localStorage.getItem("EHL_RoleType");
  }
  getRoleId(){
    return localStorage.getItem("EHL_RoleId");
  }
  clear() {
    localStorage.removeItem('EHL_TOKEN');
    localStorage.removeItem('EHL_RoleType');
    localStorage.removeItem('EHL_UserName');
    this.navigateToLogin(this.router.routerState.snapshot.url);

  }
  public navigateToLogin(stateUrl) {
    this.router.navigate(['/landing'], { queryParams: { 1: { returnUrl: stateUrl } } });
  }
}
