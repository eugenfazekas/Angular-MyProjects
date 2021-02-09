import { Injectable, InjectionToken } from '@angular/core';
import { UserRestDataSourceService } from './user-rest-data-source.service';
import { UserModel } from '../../model/user.model';

@Injectable()
export class UserService {

  constructor(private userRestDataSource: UserRestDataSourceService) { }

 async saveUser(user: UserModel) {
    let result = await this.userRestDataSource.saveUser(user).toPromise()
      return result;
  }
}

