import {
  SAVE_USER_INFO,
  FETCH_USER_INFO,
  AboutUserState,
  SET_USER_WEIGHT,
  SET_USER_HEIGHT
} from '../types/AboutUser';

const initialState: AboutUserState = {
  weight: '',
  height: ''
};

export function aboutUserReducer(state = initialState, action: any) {
  switch (action.type) {
    case SAVE_USER_INFO:
      return { weight: action.weight, height: action.height };
    case FETCH_USER_INFO:
      return { weight: action.weight, height: action.height };
    case SET_USER_WEIGHT:
      return { ...state, weight: action.weight };
    case SET_USER_HEIGHT:
      return { ...state, weight: action.height };
    default:
      return state;
  }
}
