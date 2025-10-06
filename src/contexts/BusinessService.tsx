import axios from "axios";

const API_URL = "http://localhost:3001/business";

export const submitBusinessListing = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error submitting business:", error);
    throw error.response?.data || error.message;
  }
};

export const getAllBusinesses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBusinessById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
