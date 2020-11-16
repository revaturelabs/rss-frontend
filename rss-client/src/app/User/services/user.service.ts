import { Injectable, Inject, InjectionToken, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import {
  SESSION_STORAGE,
  WebStorageService,
  StorageService,
} from 'ngx-webstorage-service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';

const STORAGE_KEY = 'currentUser';

export const USER_SERVICE_STORAGE = new InjectionToken<StorageService>(
  'USER_SERVICE_STORAGE'
);

@Injectable({
  providedIn: 'root',
})
export class UserService{
  url = `${environment.accountServiceUrl}/user`;

  constructor(
    private httpclient: HttpClient,
    private router: Router,
    private location: Location,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) {
    this.user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //user controller
  loginMock(log): Observable<User> {
    return of(this.user);
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
    return this.httpclient.put<any>(this.url + '/info', user);
  }

  updatePassword(u): Observable<User> {
    this.user.password = u;
    this.user.userId = this.userPersistance().userId;
    return this.httpclient.put<any>(this.url + '/cred', this.user);
  }

  updateProfilePic(u: User): Observable<User> {
    return this.httpclient.put<any>(this.url + '/pic', u);
  }

  updateIsAdmin(user: User): Observable<User> {
    return this.httpclient.put<any>(this.url + '/master', user);
  }

  isLoggedIn = false;
  
  user: User;

  
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
    this.location.replaceState('');
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
