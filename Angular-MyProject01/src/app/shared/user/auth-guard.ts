import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { TokenService } from './token.service';
import { LogService } from '../log.service';

@Injectable()
export class AuthGuard {
  private jwt = new JwtHelperService();

  constructor(private tokenServicervice: TokenService, private router: Router,private logservice: LogService) { }
 
      canActivate(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): boolean {   
            this.logservice.logDebugMessage(String('AuthGuard canActivate() ')); 
              let token = this.tokenServicervice.getToken();
              let decodedToken = this.jwt.decodeToken(token);
              let userAuth: boolean = false;
              if(token != '') {
                for(let auth of decodedToken.authorities){
                  if(auth.authority = 'user'){
                    userAuth = true;
                  }
                }
              }
              if(!this.jwt.isTokenExpired(token) && userAuth ) {
                return true ;
          } else {
            token = '';
          this.router.navigateByUrl('login');
                return false ;
      }
  }
}

