import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard {
  private jwt = new JwtHelperService();

  constructor(private tokenServicervice: TokenService, private router: Router) { }
 
      canActivate(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): boolean {
            let token = this.tokenServicervice.getToken();
            let decodedToken = this.jwt.decodeToken(token);
            if(!this.jwt.isTokenExpired(token) && decodedToken.authorities[0].authority == 'user' ) {
              console.log('Auth');     return true ;
             } else {
              this.router.navigateByUrl('login');
                    return false ;
          }  
      }
  }
 


