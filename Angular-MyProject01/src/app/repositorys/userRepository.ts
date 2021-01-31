import { UserModel } from '../model/user.model';
import { Injectable } from '@angular/core';
import { UserRestDataSourceService } from '../shared/user-rest-data-source.service';

@Injectable()
export class UserRepository {

    private users: UserModel[] = new Array<UserModel>();
    private locator = (p: UserModel, id: string) => p.id == id;

    constructor(private userRestDataSource: UserRestDataSourceService) {
                this.userRestDataSource.getUsers().subscribe(data => this.users = data)
                 }

    saveUser(user: UserModel) {

        this.users.push(user);
    }

    getUser(id: string): UserModel {

        return this.users.find(p => this.locator(p, id));;
    }

    getUsers() {

        return this.users;
    }

    

}
