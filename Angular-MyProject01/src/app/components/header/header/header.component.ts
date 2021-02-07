import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SignToggleService } from 'src/app/shared/sign-toggle.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, public signToggleService: SignToggleService) { 

  }
 
  signOut() {
    this.signToggleService.removeToken();
    this.router.navigateByUrl('login');
    this.signToggleService.setLoggedIn(false);
                }
}
