import api from './api';

const AuthService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
    }

    return response.data;
  },

  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default AuthService;
