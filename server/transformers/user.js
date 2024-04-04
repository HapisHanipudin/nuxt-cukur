export const transformUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    type: user.type,
  };
};
