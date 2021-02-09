import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";

@Injectable()
export class AuthGuard {
  private jwt = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router) { }
 
      canActivate(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): boolean {
            let token = localStorage.getItem('token');
            let decodedToken = this.jwt.decodeToken(token);
            if(!this.jwt.isTokenExpired(token) && decodedToken.authorities[0].authority == 'user' )
                   return true ;
                 else {
              this.router.navigateByUrl('login');
                    return false ;
          }  
      }
  }
 


