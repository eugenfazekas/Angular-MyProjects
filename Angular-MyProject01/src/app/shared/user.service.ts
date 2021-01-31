import { Injectable, InjectionToken } from '@angular/core';
import { UserRestDataSourceService } from './user-rest-data-source.service';
import { UserModel } from '../model/user.model';
import { UserRepository } from '../repositorys/userRepository';

@Injectable()
export class UserService {

  constructor(private userRestDataSource: UserRestDataSourceService,
              private userRepository: UserRepository) { }

  loginUser(user: string, password: string) {
    this.userRestDataSource.loginUser(user, password).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  saveUser(user: UserModel) {
    this.userRestDataSource.saveUser(user).subscribe(
      res =>  this.userRepository.saveUser(res),
      err => console.log('Error ocured at saving user ', err) 
    )
  }

  getUser(key: string): UserModel {
    return this.userRepository.getUser(key);
}

  getUsers(): UserModel[] {
    return this.userRepository.getUsers();
}

}

