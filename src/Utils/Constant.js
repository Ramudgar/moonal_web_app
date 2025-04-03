// Base API versioning (scalable if v2 comes later)
export const API_BASE = '/api/v1';

export const API_ENDPOINTS = {
  CONTACT: {
    CREATE: `${API_BASE}/contact/create`,
    GET_ALL: `${API_BASE}/contact`,
    GET_ONE: (id) => `${API_BASE}/contact/${id}`,
    DELETE: (id) => `${API_BASE}/contact/${id}`,
  },
};