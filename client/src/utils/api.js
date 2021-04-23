import axios from 'axios';

export const getPage = async (page) => {
  const res = await axios.get(`/api/user/list/${page}`);
  return {
    pages: res.data.pages,
    users: res.data.users.map((user) => {
      const newUser = user;
      return newUser;
    }),
  };
};

export const createUser = async (user) => {
  const res = await axios.post('/api/user/new', user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await axios.put(`/api/user/${id}`, user);
  return [res.status, res.data];
};

export const removeUser = async (id) => (
  axios.delete(`/api/user/${id}`)
);
