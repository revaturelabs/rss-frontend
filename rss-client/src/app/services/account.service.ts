import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../interfaces/account';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  mockAccounts: Account[];

  generateMockAccounts(userId): Account[] {
    let account: Account = {
      accId: 0,
      userId: userId,
      accTypeId: 0,
      points: 10000
    }
    let bugBounty: Account = {
      accId: 1,
      userId: userId,
      accTypeId: 1,
      points: 20000
    }
    return [account, bugBounty];
  }
  //url = 'http://localhost:9000/account';
  url = 'http://ec2-34-203-75-254.compute-1.amazonaws.com:10001/account';
  constructor(private httpclient: HttpClient) {
    this.mockAccounts = this.generateMockAccounts(2021);
  }

  //Account controller

  user: User = {
    userId: 0,
    email: '',
    password: '',
    profilePic: null,
    firstName: '',
    lastName: '',
    admin: false
  };

  account: Account;
  getAllUserAccounts(id): Observable<any> {
    this.user.userId = id;
    return this.httpclient.post<any>(this.url + '/accounts', this.user);
  }

  getAccountByAccId(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/account', acc);
  }

  getAccountByUserId(user: User): Observable<Account[]> {
    return this.httpclient.post<any[]>(this.url + '/accounts', user);
  }

  // getAllAccountUsers(account: Account): Observable<Account> {
  //   return this.httpclient.post<any>(this.url + '/account/account/ai', account);
  // }

  // linkAccount(account: Account): Observable<Account> {
  //   return this.httpclient.post<any>(this.url + '/account/account', account);
  // }

  getAllAccounts(): Observable<any> {
    return this.httpclient.get<any>(
      'http://ec2-34-203-75-254.compute-1.amazonaws.com:10001/acctype/all'
    );
  }

  getAccountsByUser(user: User): Observable<Account[]> {
    return of(this.mockAccounts);
  }

  getAccountsByUserId(userId: number): Observable<Account[]> {
    return of(this.mockAccounts);
  }

  updateAccount(account: Account): Observable<Account> {
    for (let i = 0; i < this.mockAccounts.length; i++) {
      if (this.mockAccounts[i].accId == account.accId) {
        this.mockAccounts[i] = account;
      }
    }
    return of(account);
  }

  createAccount(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/new', account);
  }
  updatePoints(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/points/a', account);
  }
  setPoints(account: Account): Observable<Account> {
    return this.httpclient.post<any>(this.url + '/points', account);
  }
}
