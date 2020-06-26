import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpclient: HttpClient) { }

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
    return this.httpclient.post<any>(
      'http://localhost:9000/account/accounts',
      this.user
    );
  }


  getAccountByAccId(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/account',
      acc
    );
  }

  getAccountByUserId(user: User): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/accounts',
      user
    )
  }

  getAllAccountUsers(account: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/account/ai',
      account
    );
  }
  linkAccount(account: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/account',
      account
    );
  }

  getAllAccounts(): Observable<any> {
    return this.httpclient.get<any>('http://localhost:9000/acctype/all');
  }

  createAccount(account: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/new',
      account
    )
  }
  updatePoints(account: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/points/a',
      account
    );
  }
  setPoints(account: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/points',
      account
    );
  }
}
