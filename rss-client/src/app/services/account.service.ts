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

  constructor(private httpclient: HttpClient) {
    this.mockAccounts = this.generateMockAccounts(2021);
  }

  generateMockAccounts(userId): Account[] {
    let account: Account = {
      accId: 0,
      userId: userId,
      accTypeId: 0,
      points: 1000
    }
    let bugBounty: Account = {
      accId: 1,
      userId: userId,
      accTypeId: 1,
      points: 2000
    }
    return [account, bugBounty];
  }

  updatePoints(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/updatepoints',
      acc
    );
  }

  addAccount(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/addaccount',
      acc
    );
  }

  getAccountByAccId(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/accuont/getaccountbyaccid',
      acc
    );
  }

  getAccountByUserId(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/getaccountbyuserid',
      acc
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
}
