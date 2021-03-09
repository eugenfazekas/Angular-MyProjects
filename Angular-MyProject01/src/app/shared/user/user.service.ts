import { Injectable, InjectionToken } from '@angular/core';
import { UserRestDataSourceService } from './user-rest-data-source.service';
import { UserModel } from '../../model/user.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { LogService } from '../log.service';

@Injectable()
export class UserService {

  constructor(private userRestDataSource: UserRestDataSourceService, private logservice: LogService) {
    this.logservice.logDebugMessage(String('UserService constructor: '));
   }

/*
 async saveUser(user: UserModel) {
    let result = await this.userRestDataSource.saveUser(user).toPromise()
      return result;
  }
  */

  saveUser(user: UserModel): Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserService saveUser() '));
      return this.userRestDataSource.saveUser(user);
  }

  getUser(email: string): Observable<UserModel> { 
    this.logservice.logDebugMessage(String('UserService getUser() '));
      return this.userRestDataSource.getUser(email);
  }

  updateUser(userModel: UserModel): Observable<UserModel> { 
    this.logservice.logDebugMessage(String('UserService updateUser() '));
    return this.userRestDataSource.updateUser(userModel);
}
}

