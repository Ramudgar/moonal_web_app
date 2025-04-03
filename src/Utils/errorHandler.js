// src/Utils/errorHandler.js

export const parseApiError = (error) => {
    if (typeof error === 'string') return error;
  
    if (error?.response?.data?.message) return error.response.data.message;
  
    if (error?.message) return error.message;
  
    return 'Something went wrong. Please try again.';
  };
  