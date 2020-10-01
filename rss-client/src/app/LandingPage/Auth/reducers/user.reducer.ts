import { User } from '../../../User/models/user';
import { LOGIN_USER, LOGOUT_USER } from '../actions/users.actions';

export interface UserState {
  user?: User,
  isLoggedIn: boolean
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false
      }
    default:
      return state;
  }
}
