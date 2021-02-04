import { Injectable, InjectionToken } from '@angular/core';
import { UserRestDataSourceService } from './user-rest-data-source.service';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {

  constructor(private userRestDataSource: UserRestDataSourceService) { }

  loginUser(user: string, password: string) {
    this.userRestDataSource.loginUser(user, password).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  saveUser(user: UserModel) {
    this.userRestDataSource.saveUser(user).subscribe(
      res =>  console.log(res),
      err => console.log('Error ocured at saving user ', err) 
    )
  }

}

