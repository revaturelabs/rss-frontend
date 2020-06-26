import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
<<<<<<< HEAD
=======
import { Account } from '../interfaces/account';
>>>>>>> 79c6b676054bef133058f1d8e730e47ae2ca3867

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
  getAllUserAccounts(id): Observable<any> {
    this.user.userId = id;
    return this.httpclient.post<any>(
      'http://localhost:9000/account/account/ui',
      this.user
    );
  }


  getAccountByAccId(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/account/ai',
      acc
    );
  }

  getAccountByUserId(user: User): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/account/ui',
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
