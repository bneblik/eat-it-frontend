import axios from 'axios';

export const JWT_TOKEN = 'jwt_token';
export const USER_ID = 'user_id';
export const API_URL = 'http://localhost:3000';
// export const API_URL = 'https://damp-chamber-97402.herokuapp.com';
const BASE_URL = `${API_URL}/api/v1/`;

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
  ABOUT_USER_URL: 'about_user',
  CATEGORIES_URL: 'meal_categories',
  FIND_MEALS_URL: 'meals/find',
  MEAL_PLAN_EATEN_URL: 'meal_plan/eaten'
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'text',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

axiosInstance.interceptors.request.use((response) => response, (error) => Promise.reject(error));

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

axiosInstanceWithAuth.interceptors.request.use((response) => response, (error) => Promise.reject(error));
