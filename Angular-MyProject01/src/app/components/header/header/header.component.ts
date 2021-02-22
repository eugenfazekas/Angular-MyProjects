import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SignButtonToggleService } from 'src/app/shared/user/sign-button-toggle.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, public signToggleService: SignButtonToggleService) { 

  }
 
  signOut() {
    this.signToggleService.removeToken();
    this.router.navigateByUrl('login');
    this.signToggleService.setLoggedIn(false);
    this.signToggleService.name = '' ;
    window.location.reload();
   }
}
