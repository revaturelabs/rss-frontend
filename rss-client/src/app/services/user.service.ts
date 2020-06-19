import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpclient: HttpClient, private store: Store<any>) {}
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
      'http://localhost:9000/user/updateinfo',
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

  updateState(obj) {
    this.store.dispatch({
      type: obj.action,
      payload: obj.payload,
    });
  }

  getCurrentUserState() {
    return this.store.select('user.reducer');
  }
}
