import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = 'http://localhost:9000';
  // url = "http://ec2-34-203-75-254.compute-1.amazonaws.com:10001"
  constructor(private httpclient: HttpClient) {}

  //Account controller

  user: User = {
    userId: 0,
    email: '',
    password: '',
    profilePic: null,
    firstName: '',
    lastName: '',
    admin: false,
  };

  account: Account;
  getAllUserAccounts(id): Observable<any> {
    this.user.userId = id;
    return this.httpclient.post<any>(this.url + '/account/accounts', this.user);
  }

  getAccountByAccId(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/account/account', acc);
  }

  getAccountByUserId(user: User): Observable<Account[]> {
    return this.httpclient.post<any[]>(this.url + '/account/accounts', user);
  }

  getAllAccountUsers(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/account/account/ai', account);
  }
  linkAccount(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/account/account', account);
  }

  getAllAccounts(): Observable<any> {
    return this.httpclient.get<any>(this.url + '/acctype/all');
  }

  createAccount(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/account/new', account);
  }
  updatePoints(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/account/points/a', account);
  }
  setPoints(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/account/points', account);
  }
}
