const API_BASE_URL = 'http://localhost:9000/api/admin';

export const adminApi = {
  fetchItems: async () => {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  },

  fetchItemById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) throw new Error('Failed to fetch item');
    return response.json();
  },

  fetchMembers: async () => {
    const response = await fetch(`${API_BASE_URL}/members`);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  },

  fetchMemberById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`);
    if (!response.ok) throw new Error('Failed to fetch member');
    return response.json();
  },

  fetchBrands: async () => {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) throw new Error('Failed to fetch brands');
    return response.json();
  },

  fetchBrandByName: async (brandName) => {
    const response = await fetch(`${API_BASE_URL}/brands/${brandName}`);
    if (!response.ok) throw new Error('Failed to fetch brand');
    return response.json();
  },

  deleteBrand: async (brandName) => {
    const response = await fetch(`${API_BASE_URL}/brands/${brandName}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete brand');
    return true;
  },
};