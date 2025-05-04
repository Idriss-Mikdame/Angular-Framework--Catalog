import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  MaybeAsync,
  GuardResult,
  Router
} from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

  @Injectable({
    providedIn: 'root'
  })
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthentificationService,private route:Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
   let autehticated =   this.authService.isAuthenticated()
    if (autehticated==false){
      this.route.navigateByUrl('/login')
      return false
    }else {
      return true
    }
  }


  }




