
import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './user.reducer'

export interface AppUserState {
    userReducer: fromUsers.UserState
}

export const reducers: ActionReducerMap<AppUserState> = {
    userReducer: fromUsers.reducer
}

