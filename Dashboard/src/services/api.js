import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';



export const fetchUsers = async (page = 1, limit = 3) => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
  
      // Calculate the start and end index for the slice
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
  
      // Slice the data for pagination
      const paginatedUsers = data.slice(startIndex, endIndex);
  
      return {
        users: paginatedUsers,
        total: data.length, 
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  };
export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const editUser = async (user) => {
  const response = await axios.put(`${API_URL}/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
