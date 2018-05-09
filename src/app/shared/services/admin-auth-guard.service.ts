import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import {UserService} from './user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private _auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this._auth.appUser$
      .map(appUser => appUser.isAdmin);
  }
}

