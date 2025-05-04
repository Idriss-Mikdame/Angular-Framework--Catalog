import { Injectable } from '@angular/core';
import {Appuser} from '../Model/user.model';
import {UUID} from 'angular2-uuid';
import {Observable, of, throwError} from 'rxjs';
import {json} from 'node:stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  users : Appuser[]=[];
  AuthenticatedUser : Appuser | undefined;
  constructor() {
      this.users.push({userId : UUID.UUID(),username : "user1", password : "1234", roles : ["USER"]}),
      this.users.push({userId : UUID.UUID(),username : "user2", password : "12345", roles : ["USER"]}),
      this.users.push({userId : UUID.UUID(),username : "admin", password : "123456", roles : ["USER","ADMIN"]})
  }
  public login(username:string, password:string):Observable<Appuser>{
    let appUser  = this.users.find(u=>u.username==username);
    if (!appUser) return throwError(()=>new Error('User not found'));
    if (appUser.password!=password){
      return throwError(()=>new Error("Bad cerdential"));
    }
  return of(appUser)
  }
public authenticatedUser(appuser:Appuser):Observable<boolean>{
    this.AuthenticatedUser = appuser;
    localStorage.setItem("authUser",JSON.stringify({username : appuser.username,roles:appuser.roles,jwt:"JWT_Token"}))
    return of(true)
  }
  public hasRole(role:string):boolean{
    return this.AuthenticatedUser!.roles.includes(role)
  }
  public isAuthenticated(){
    return this.AuthenticatedUser!=undefined
  }
  public logout():Observable<boolean>{
    this.AuthenticatedUser=undefined;
    localStorage.removeItem("authUser")
    return of(true)
  }
}
