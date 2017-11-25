import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  login(user: string, password: string): boolean {
    // 登录的逻辑
    if (user === 'user' && password === 'password') {
      localStorage.setItem('username', user);
      return true;
    }

    return false;
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}

export var AUTH_PROVIDERS: Array<any> = [
  {provide: AuthService, useClass: AuthService}
];
