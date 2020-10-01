import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Account } from '../interfaces/account'

let httpClientSpy : {get: jasmine.Spy};
let accountService : AccountService;

beforeEach(() => {
  //spy on the methods here
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  accountService = new AccountService(<any>httpClientSpy);
});

it('should return expected accounts', () => {
  const expectedAccounts: Account[] =
    [{ accId: 1, userId: 1, accTypeId: 1, points: 20 },
    { accId: 2, userId: 1, accTypeId: 2, points: 0 }];

  httpClientSpy.get.and.returnValue(of(expectedAccounts));

  accountService.getAllAccounts().subscribe(
    accs => expect(accs).toEqual(expectedAccounts, 'expected accounts'),
    fail
  );

  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

});
