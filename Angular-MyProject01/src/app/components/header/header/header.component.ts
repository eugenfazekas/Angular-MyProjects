import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { SignButtonToggleService } from 'src/app/shared/user/sign-button-toggle.service';
import { TokenService } from 'src/app/shared/user/token.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  subscription: Subscription;
  admin: boolean;
  constructor(private router: Router, public signToggleService: SignButtonToggleService,private tokenService: TokenService) {
    this.admin = tokenService.getAdmin();
    this.subscription = this.tokenService.getAdminObs().subscribe(res => this.admin = res );
   }

  signOut() {
    this.signToggleService.removeToken();
    this.router.navigateByUrl('login');
    this.signToggleService.setLoggedIn(false);
    this.signToggleService.name = '' ;
    window.location.reload();
   }

}
