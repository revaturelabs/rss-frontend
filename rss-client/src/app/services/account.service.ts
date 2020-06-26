import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpclient: HttpClient) { }

  updatePoints(acc: Account): Observable<Account> {
    return this.httpclient.post<any>(
      'http://localhost:9000/account/updatepoints',
      acc
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
    );
  }
}
