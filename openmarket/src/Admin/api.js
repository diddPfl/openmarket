const API_BASE_URL = 'http://localhost:9000/api/admin';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
};

export const adminApi = {
  fetchItems: async () => {
    const response = await fetch(`${API_BASE_URL}/items`);
    return handleResponse(response);
  },

  fetchItemById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    return handleResponse(response);
  },

  fetchMembers: async () => {
    const response = await fetch(`${API_BASE_URL}/members`);
    return handleResponse(response);
  },

  fetchMemberById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`);
    return handleResponse(response);
  },

  fetchBrands: async () => {
    const response = await fetch(`${API_BASE_URL}/brands`);
    return handleResponse(response);
  },

  fetchBrandByName: async (brandName) => {
    const response = await fetch(`${API_BASE_URL}/brands/${brandName}`);
    return handleResponse(response);
  },

  deleteBrand: async (brandName) => {
    const response = await fetch(`${API_BASE_URL}/brands/${brandName}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};