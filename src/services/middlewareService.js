import axios from 'axios';

const middlewareClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

const setAuthToken = (token) => {
  if (token) {
    middlewareClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete middlewareClient.defaults.headers.common['Authorization'];
  }
};

export const registerUser = (data) => {
  return middlewareClient.post('/api/auth/register', data);
};

export const loginUser = (data) => {
  return middlewareClient.post('/api/auth/login', data);
};

export const getAuthenticatedUser = (token) => {
  setAuthToken(token);
  return middlewareClient.get('/api/auth/user');
};

export const processDass21 = (data, token) => {
  setAuthToken(token);
  return middlewareClient.post('/api/dass21', data);
};

export const registerPatient = (data, token) => {
  setAuthToken(token);
  return middlewareClient.post('/api/register-patient', data);
};

export const getLocations = (token) => {
  setAuthToken(token);
  return middlewareClient.get('/api/locations');
};

export const createVisit = (data, token) => {
  setAuthToken(token);
  return middlewareClient.post('/api/create-visit', data);
};

export default {
  middlewareClient,
  setAuthToken,
  registerUser,
  loginUser,
  getAuthenticatedUser,
  processDass21,
  registerPatient,
  getLocations,
  createVisit
}; 