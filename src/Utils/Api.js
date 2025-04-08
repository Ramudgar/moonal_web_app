  import axios from 'axios';

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, 
  });

 // Add a request interceptor to include the token in the headers
// api.interceptors.request.use((config) => {
//   if (config.requiresAuth) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });


  export default api;
