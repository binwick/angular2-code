import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/AuthService';

/**
 * 路由器钩子，只有登录之后才能访问的组件
 */
@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(): boolean {
    return this.authService.isLoggedIn();
  }
}
