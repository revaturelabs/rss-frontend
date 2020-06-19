import { Action } from '@ngrx/store';
import { User } from '../../interfaces/user'
//load users
export const LOGIN_USER = '[User] Load Users Fail';
export const LOGOUT_USER = '[User] Load Users Success';


export class LoginUser {
    readonly type = LOGIN_USER;
    constructor(public payload: User) { }

}

export class LogoutUser {
    readonly type = LOGOUT_USER;
    constructor(public payload: User) { }
}


//action types
export type UserAction = LoginUser | LogoutUser