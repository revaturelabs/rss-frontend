import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpclient: HttpClient) {}

  login() {}

  getAllUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>('localhost:9000/user/all');
  }

  getUserById(id): Observable<User> {
    return this.httpclient.post<any>('localhost:9000/user/getuserbyid', id);
  }

  getUserByEmail(em): Observable<User> {
    return this.httpclient.post<any>('localhost:9000/user/getuserbyemail', em);
  }

  addUser(user): Observable<User> {
    return this.httpclient.post<any>('localhost:9000/user/adduser', user);
  }

  updateInfo(user): Observable<User> {
    return this.httpclient.post<any>('localhost:9000/user/updateinfo', user);
  }

  updatePassword(u): Observable<User> {
    return this.httpclient.post<any>('localhost:9000/user/updatepassword', u);
  }

  updateProfilePic(u): Observable<User> {
    return this.httpclient.post<any>('localhost:9000/user/updateprofilepic', u);
  }

  updateIsAdmin(user): Observable<User> {
    return this.httpclient.post<any>('localhost:9000/user/updateisadmin', user);
  }
}
