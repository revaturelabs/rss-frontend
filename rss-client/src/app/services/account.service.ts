import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpclient: HttpClient) {}

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
}
