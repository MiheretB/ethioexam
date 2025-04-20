import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      message: error.message,
      response: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  signup: async (userData: any) => {
    console.log('Making signup request with:', userData);
    try {
      const response = await api.post('/auth/register', userData);
      console.log('Signup successful:', response.data);
      return response;
    } catch (error: any) {
      console.error('Signup error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },
  
  verifyToken: () =>
    api.get('/auth/verify')
};