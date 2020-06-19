import { User } from '../../interfaces/user';
import * as fromUsers from '../actions/users.actions';

export interface UserState {
  data: User[];
  loaded: boolean;
  loading: boolean;
}

export const initilState: UserState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(
  state = initilState,
  action: fromUsers.UserAction
): UserState {
  switch (action.type) {
    case fromUsers.LOAD_USERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromUsers.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case fromUsers.LOAD_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}
