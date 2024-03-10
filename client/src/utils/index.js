const getBlogThumbnail = (thumbnail) => {
  return `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${thumbnail}`;
};

export { getBlogThumbnail };
