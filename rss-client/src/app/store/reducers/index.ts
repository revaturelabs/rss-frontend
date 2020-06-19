
import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './user.reducer'

export interface ProductsState {
    users: fromUsers.UserState
}

export const reducers: ActionReducerMap<ProductsState> = {
    users: fromUsers.reducer
}

