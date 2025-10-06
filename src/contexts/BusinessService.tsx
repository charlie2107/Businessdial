// services/businessService.ts
import api from '../services/api';

const API_URL = '/business';

// Submit a new business listing
export const submitBusinessListing = async (formData: FormData) => {
  try {
    const { data } = await api.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error: any) {
    console.error('Error submitting business:', error);
    throw error.response?.data || error.message;
  }
};

// Get all businesses
export const getAllBusinesses = async () => {
  try {
    const { data } = await api.get(API_URL);
    return data;
  } catch (error: any) {
    console.error('Error fetching businesses:', error);
    throw error.response?.data || error.message;
  }
};

// Get business by ID
export const getBusinessById = async (id: string) => {
  try {
    const { data } = await api.get(`${API_URL}/${id}`);
    return data;
  } catch (error: any) {
    console.error(`Error fetching business with id ${id}:`, error);
    throw error.response?.data || error.message;
  }
};

// Get reviews for a business
export const getBusinessReviews = async (id: string) => {
  try {
    const { data } = await api.get(`${API_URL}/${id}/reviews`);
    return data;
  } catch (error: any) {
    console.error(`Error fetching reviews for business id ${id}:`, error);
    throw error.response?.data || error.message;
  }
};

// Add a review for a business
export const addBusinessReview = async (
  id: string,
  review: { userId: string; rating: number; comment: string }
) => {
  try {
    const { data } = await api.post(`${API_URL}/${id}/review`, review);
    return data;
  } catch (error: any) {
    console.error(`Error adding review for business id ${id}:`, error);
    throw error.response?.data || error.message;
  }
};
