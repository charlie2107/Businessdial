// services/businessService.ts
import api from './api';

export interface Business {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
  category: {
    _id: string;
    name: string;
    icon: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const searchBusinesses = async (query: string): Promise<Business[]> => {
  try {
    const { data } = await api.get<Business[]>(`/business/search`, {
      params: { q: query },
    });
    return data;
  } catch (err) {
    console.error("Error fetching businesses:", err);
    return [];
  }
};
