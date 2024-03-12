export const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const stopDefaultBehavior = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const getBlogThumbnail = (thumbnail) => {
  return `${baseURL}/uploads/blog/${thumbnail}`;
};

const getUserAvatar = (userAvatar, nameFirstChar) => {
  return userAvatar !== null
    ? `${baseURL}/uploads/avatar/${userAvatar}`
    : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;
};

// blog author avatar or comment author avatar
const getAuthorAvatar = (authorAvatar, nameFirstChar) => {
  return authorAvatar !== null
    ? `${baseURL}/uploads/avatar/${authorAvatar}`
    : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;
};

export {
  getAuthorAvatar,
  getBlogThumbnail,
  getUserAvatar,
  stopDefaultBehavior,
};
