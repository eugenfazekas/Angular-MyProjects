import { UserAddress } from "./user.address";

export class UserModel {
 				 
	constructor(
				 public id?: string,
				 public firstName?: string,
				 public lastName?: string,
				 public fullName?: string,
				 public email?: string,
				 public	password?: string,
				 public date_registered?: string,
				 public	active?: boolean,
				 public activeProfilePhoto?: string,
				 public authorities?:  string[], 
				 public articlesId?: string[],
				 public profilePhotos?:  string[], 
				 public address?: UserAddress
				) {}
}
