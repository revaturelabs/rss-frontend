import { User } from '../../interfaces/user'
import * as fromUsers from '../actions/users.actions';

export interface UserState {
    user?: User;
    isLoggedIn: boolean;
}

export const initialState: UserState = {
    user: null,
    isLoggedIn: false
}

export function reducer(state = initialState, action: fromUsers.UserAction): UserState {
    switch (action.type) {

        case fromUsers.LOGIN_USER: {
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };
        }
        case fromUsers.LOGOUT_USER: {
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        }
    }

    return state;
}