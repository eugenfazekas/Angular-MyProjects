import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/shared/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private logservice: LogService) {
    this.logservice.logDebugMessage(String('HomeComponent constructor: '));
   }

  ngOnInit(): void {
  }

}
