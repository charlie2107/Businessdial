// services/categoryService.ts
import api from '../services/api';

export const getAllCategories = async () => {
  try {
    const { data } = await api.get('/categories');
    return data;
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    throw error.response?.data || error.message;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const { data } = await api.get(`/business/category/${id}`);
    return data;
  } catch (error: any) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error.response?.data || error.message;
  }
};
