import axios from 'axios';

export const JWT_TOKEN = 'jwt_token';
const BASE_URL = 'http://localhost:3000/api/v1/';
export const requestConsts = {
  MEALS_URL: 'meals',
  CREATE_USER_URL: 'users/registrations',
  LOG_IN_URL: 'users/sessions',
  LOG_OUT_URL: 'users/logout',
  GET_PRODUCTS_URL: 'products',
  FRIDGE_URL: 'fridges',
  SHOPPING_LIST_URL: 'shopping_lists',
  COMMENT_URL: 'comments',
  STATISTICS_URL: 'statistics',
  MEAL_PLAN_URL: 'meal_plan',
  RECOMMENDED_MEALS: 'recommended',
  ABOUT_USER_URL: 'about_user'
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'text',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const createAxiosInstanceWithAuth = () => {
  const jwtToken = localStorage.getItem(JWT_TOKEN);
  if (jwtToken) {
    return axios.create({
      baseURL: BASE_URL,
      responseType: 'text',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: jwtToken
      }
    });
  }
  return axiosInstance;
};

export const axiosInstanceWithAuth = createAxiosInstanceWithAuth();
