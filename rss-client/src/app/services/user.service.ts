import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import {
  SESSION_STORAGE,
  WebStorageService,
  StorageService,
} from 'ngx-webstorage-service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

const STORAGE_KEY = 'currentUser';

export const USER_SERVICE_STORAGE = new InjectionToken<StorageService>(
  'USER_SERVICE_STORAGE'
);

@Injectable({
  providedIn: 'root',
})
export class UserService {

  // url = 'http://localhost:9000/user';

  url = 'http://ec2-100-25-22-66.compute-1.amazonaws.com:10001/user';
  constructor(
    private httpclient: HttpClient,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //user controller
  loginMock(log): Observable<User> {
    return of(this.user)
  }

  login(log): Observable<User> {
    return this.httpclient.post<any>(
      this.url + '/login',
      log,
      this.httpOptions
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>(this.url + '/all');
  }

  getUserById(id: User): Observable<User> {
    return this.httpclient.post<any>(this.url + '/user', id);
  }

  addUser(user: User): Observable<User> {
    return this.httpclient.post<any>(this.url + '/adduser', user);
  }

  updateInfo(user: User): Observable<User> {
    return this.httpclient.post<any>(this.url + '/info', user);
  }

  updatePassword(u): Observable<User> {
    this.user.password = u;
    this.user.userId = this.userPersistance().userId;
    return this.httpclient.post<any>(this.url + '/cred', this.user);
  }

  updateProfilePic(u: User): Observable<User> {
    return this.httpclient.post<any>(this.url + '/pic', u);
  }

  updateIsAdmin(user: User): Observable<User> {
    return this.httpclient.post<any>(this.url + '/master', user);
  }

  isLoggedIn = false;
  // user: User = {
  //   userId: 2021,
  //   email: '',
  //   password: '',
  //   profilePic: null,
  //   firstName: 'test',
  //   lastName: 'testerson',
  //   admin: false
  // };
  user: User = {
    userId: 2021,
    email: '',
    password: '',
    profilePic: null,
    firstName: 'admin',
    lastName: 'admin',
    admin: false
  };
  // user: User = {
  //   userId: 2022,
  //   email: 'admin',
  //   password: 'admin',
  //   profilePic: null,
  //   firstName: 'admin',
  //   lastName: 'admin',
  //   admin: true,
  //   //userCartIds: []
  // };
  changeUser(user: User) {
    this.isLoggedIn = true;
    this.user = user;
    const cUser: User = this.storage.get(STORAGE_KEY) || user;
    this.storage.set(STORAGE_KEY, cUser);
  }

  changeProfilePic(user: User) {
    this.user = user;
    this.storage.set(STORAGE_KEY, this.user);
  }

  logout() {
    this.isLoggedIn = false;
    this.storage.set(STORAGE_KEY, undefined);
    sessionStorage.clear();
    window.location.reload();
  }

  userPersistance() {
    return this.storage.get(STORAGE_KEY);
  }
  getCurrentUser() {
    return this.user;
  }
  loggedIn() {
    return this.isLoggedIn;
  }
}