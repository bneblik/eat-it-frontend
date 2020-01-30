import {
  AboutUserState,
  SET_USER_WEIGHT,
  SET_USER_HEIGHT,
  SAVE_ABOUT_USER_SUCCESS,
  FETCH_ABOUT_USER_SUCCESS,
  CLEAR_ABOUT_USER_ERROR,
  CLEAR_ABOUT_USER_SUCCESS,
  ABOUT_USER_ERROR,
  SET_USER_AGE,
  SET_USER_GENDER
} from '../types/AboutUser';

const initialState: AboutUserState = {
  weight: '',
  height: '',
  gender: '',
  age: '',
  pending: false,
  error: null,
  success: null
};

export function aboutUserReducer(state = initialState, action: any) {
  switch (action.type) {
    case SAVE_ABOUT_USER_SUCCESS:
      return { ...state, pending: false, success: action.success };
    case FETCH_ABOUT_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        weight: action.weight,
        height: action.height,
        age: action.age,
        gender: action.gender
      };
    case SET_USER_WEIGHT:
      return { ...state, weight: action.weight };
    case SET_USER_HEIGHT:
      return { ...state, height: action.height };
    case SET_USER_GENDER:
      return { ...state, gender: action.gender };
    case SET_USER_AGE:
      return { ...state, age: action.age };
    case ABOUT_USER_ERROR:
      return { ...state, error: action.error };
    case CLEAR_ABOUT_USER_ERROR:
      return { ...state, error: null };
    case CLEAR_ABOUT_USER_SUCCESS:
      return { ...state, success: null };
    default:
      return state;
  }
}
