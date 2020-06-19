import { Action } from '@ngrx/store';
import { User } from '../../interfaces/user'
//load users
export const LOAD_USERS = '[User] Load Users'
export const LOAD_USERS_FAIL = '[User] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[User] Load Users Success';

export class LoadUsers {
    readonly type = LOAD_USERS;

}

export class LoadUsersFail {
    readonly type = LOAD_USERS_FAIL;
    constructor(public payload: any) { }

}

export class LoadUsersSuccess {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: User[]) { }
}


//action types
export type UserAction = LoadUsers | LoadUsersFail | LoadUsersSuccess