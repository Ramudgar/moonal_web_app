// Base API versioning (scalable if v2 comes later)
export const API_BASE = "/api/v1";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE}/auth/register`,
    LOGIN: `${API_BASE}/auth/login`,
    ME: `${API_BASE}/auth/me`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
    CHANGE_PASSWORD: `${API_BASE}/auth/change-password`,
    LOGOUT: `${API_BASE}/auth/logout`,
  },
  CONTACT: {
    CREATE: `${API_BASE}/contact/create`,
    GET_ALL: `${API_BASE}/contact`,
    GET_ONE: (id) => `${API_BASE}/contact/${id}`,
    DELETE: (id) => `${API_BASE}/contact/${id}`,
  },
  DELEARSHIP: {
    CREATE: `${API_BASE}/delearship`,
    GET_ALL: `${API_BASE}/delearship`,
    GET_ONE: (id) => `${API_BASE}/delearship/${id}`,
    DELETE: (id) => `${API_BASE}/delearship/${id}`,
  },
  PRODUCT: {
    GET_ALL: `${API_BASE}/products`,
    GET_ONE: (id) => `${API_BASE}/products/${id}`,
    CREATE: `${API_BASE}/products`,
    UPDATE: (id) => `${API_BASE}/products/${id}`,
    DELETE: (id) => `${API_BASE}/products/${id}`,
  },
  EVENTS: {
    CREATE: `${API_BASE}/events/create`,
    UPDATE_WITH_GALLERY: (id) => `${API_BASE}/events/update-with-gallery/${id}`,
    UPDATE: (id) => `${API_BASE}/events/update/${id}`,
    GET_ALL_WITH_GALLERY: `${API_BASE}/events/all-with-gallery`,
    GET_ONE: (id) => `${API_BASE}/events/${id}`,
    DELETE_ONE: (id) => `${API_BASE}/events/${id}`,
    DELETE_ALL: `${API_BASE}/events`,
  },
  GALLERY: {
    UPDATE: (eventId) => `${API_BASE}/gallery/${eventId}`, // PUT (images[])
    DELETE_IMAGE: (publicId) => `${API_BASE}/gallery/delete-image/${publicId}`,
    DELETE_BY_EVENT_ID: (eventId) => `${API_BASE}/gallery/delete/${eventId}`,
    GET_ALL_WITH_EVENT: `${API_BASE}/gallery/all-with-event`,
    GET_BY_EVENT_ID: (eventId) => `${API_BASE}/gallery/${eventId}`,
  },
};
