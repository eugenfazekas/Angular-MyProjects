import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/shared/services/log.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  reloadcheck: boolean = false;

  constructor(private tokenService : TokenService, private logservice: LogService) {
    this.logservice.logDebugMessage(String('HomeComponent constructor: '));
   }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.reloadcheck == true ?  window.location.reload() : null ;
    this.reloadcheck = true ; 
  }

}
