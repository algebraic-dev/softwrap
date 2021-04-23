export const getPage = async (page) => {
  let res = await fetch(`http://localhost:4040/user/list/${page}`, {
    mode: 'cors',
    method: 'GET',
  });
  res = await res.json();
  return {
    pages: res.pages,
    users: res.users.map((user) => {
      const newUser = user;
      return newUser;
    }),
  };
};

export const createUser = async (user) => {
  const res = await fetch('http://localhost:4040/user/new', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(user),
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`http://localhost:4040/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify(user),
  });
  return [res.status, await res.json()];
};

export const removeUser = async (id) => (
  fetch(`http://localhost:4040/user/${id}`, {
    method: 'DELETE',
    mode: 'cors',
  })
);
