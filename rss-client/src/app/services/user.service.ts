import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  constructor(
    private httpclient: HttpClient,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(log): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/login',
      log,
      this.httpOptions
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>('http://localhost:9000/user/all');
  }

  getUserById(id: User): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/getuserbyid',
      id
    );
  }

  getUserByEmail(em: User): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/getuserbyemail',
      em
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/adduser',
      user
    );
  }

  updateInfo(user: User): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/update/i',
      user
    );
  }

  updatePassword(u: User): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/updatepassword',
      u
    );
  }

  updateProfilePic(u: User): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/updateprofilepic',
      u
    );
  }

  updateIsAdmin(user: User): Observable<User> {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/updateisadmin',
      user
    );
  }

  isLoggedIn = false;
  user: User = {
    userId: 0,
    email: '',
    password: '',
    profilePic: null,
    firstName: '',
    lastName: '',
    admin: false,
  };
  changeUser(user: User) {
    this.isLoggedIn = true;
    this.user = user;
    const cUser: User = this.storage.get(STORAGE_KEY) || user;
    this.storage.set(STORAGE_KEY, cUser);
    console.log(this.storage.get(STORAGE_KEY));
  }

  logout() {
    this.isLoggedIn = false;
    this.storage.set(STORAGE_KEY, undefined);
    window.location.reload();
    this.router.navigate(['/']);
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
