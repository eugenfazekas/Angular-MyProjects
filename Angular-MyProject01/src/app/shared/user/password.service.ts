import { Injectable } from '@angular/core';

@Injectable()
export class PasswordService {

  password: string;
  confirmPassword: string;

  constructor() { }

  getPassword(): string  {
      return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getConfirmPassword(): string  {
    return this.confirmPassword;
  }

  setConfirmPassword(password: string) {
  this.confirmPassword = password;
  }
}
