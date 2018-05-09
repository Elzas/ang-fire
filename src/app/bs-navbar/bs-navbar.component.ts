import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/models/user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: User;

  constructor(private _auth: AuthService) {
  }

  async ngOnInit() {
    this._auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this._auth.logout();
  }
}
