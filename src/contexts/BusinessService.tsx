// services/businessService.ts
import api from '../services/api';

export const submitBusinessListing = async (formData: FormData) => {
  try {
    const { data } = await api.post('/business', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error: any) {
    console.error('Error submitting business:', error);
    throw error.response?.data || error.message;
  }
};

export const getAllBusinesses = async () => {
  try {
    const { data } = await api.get('/business');
    return data;
  } catch (error: any) {
    console.error('Error fetching businesses:', error);
    throw error.response?.data || error.message;
  }
};

export const getBusinessById = async (id: string) => {
  try {
    const { data } = await api.get(`/business/${id}`);
    return data;
  } catch (error: any) {
    console.error(`Error fetching business with id ${id}:`, error);
    throw error.response?.data || error.message;
  }
};
