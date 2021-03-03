import { Injectable, InjectionToken } from '@angular/core';
import { UserRestDataSourceService } from './user-rest-data-source.service';
import { UserModel } from '../../model/user.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class UserService {

  constructor(private userRestDataSource: UserRestDataSourceService) { }

/*
 async saveUser(user: UserModel) {
    let result = await this.userRestDataSource.saveUser(user).toPromise()
      return result;
  }
  */

  saveUser(user: UserModel): Observable<UserModel> {
      return this.userRestDataSource.saveUser(user);
  }

  getUser(email: string): Observable<UserModel> { 
      return this.userRestDataSource.getUser(email);
  }

  updateUser(userModel: UserModel): Observable<UserModel> { 
    return this.userRestDataSource.updateUser(userModel);
}
}

