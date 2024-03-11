const getBlogThumbnail = (thumbnail) => {
  return `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${thumbnail}`;
};

const getUserAvatar = (userAvatar, nameFirstChar) => {
  return userAvatar !== null
    ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${userAvatar}`
    : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;
};

// blog author avatar or comment author avatar
const getAuthorAvatar = (authorAvatar, nameFirstChar) => {
  return authorAvatar !== null
    ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${authorAvatar}`
    : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;
};

export { getAuthorAvatar, getBlogThumbnail, getUserAvatar };
