import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actions } from '../../actions';
import { baseURL } from '../../utils';
import useAxios from '../auth/useAxios';
import useGetUser from '../auth/useGetUser';
import useProfile from '../profile/useProfile';
import useSearch from '../search/useSearch';
import useBlog from './useBlog';

const useBlogActions = () => {
  const { profileDispatch } = useProfile();
  const { api } = useAxios();
  const user = useGetUser();
  const { blogDispatch } = useBlog();
  const navigate = useNavigate();
  const { searchText, searchResult, setSearchResult } = useSearch();

  //* Toggle Favorite
  const handleToggleFavorite = async (blogId) => {
    if (!user) return toast.error(`Please login to add the blog to favorites.`);

    try {
      const response = await api.patch(`${baseURL}/blogs/${blogId}/favourite`);

      if (response.status === 200) {
        profileDispatch({
          type: actions.profile.TOGGLE_FAVORITE,
          data: response.data,
        });
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  //* Toggle Like
  const handleToggleLike = async (blogId) => {
    if (!user) return toast.error(`Please login to like the blog.`);

    try {
      const response = await api.post(`${baseURL}/blogs/${blogId}/like`);

      if (response.status === 200) {
        blogDispatch({
          type: actions.blog.TOGGLE_LIKE,
          data: response.data.likes,
        });
      }
    } catch (error) {
      blogDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  //* Create New Blog
  const handleCreateBlog = async (data) => {
    const formData = new FormData();
    const file = data?.thumbnail[0];

    formData.append('thumbnail', file);
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('tags', data.tags);

    try {
      const response = await api.post(`${baseURL}/blogs/`, formData);

      if (response.status === 201) {
        profileDispatch({
          type: actions.profile.DATA_CREATED,
          data: response.data.blog,
        });
        toast.success('Blog created successfully.');
        navigate(`/blogs/${response.data?.blog?.id}`);
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  //* Delete Blog
  const handleDeleteBlog = async (blogId) => {
    const confirm = window.confirm('Are you sure you want to DELETE the blog?');

    if (confirm) {
      try {
        const response = await api.delete(`${baseURL}/blogs/${blogId}`);

        if (response.status === 200) {
          profileDispatch({
            type: actions.profile.DATA_DELETED,
            data: blogId,
          });
          blogDispatch({ type: actions.blog.DATA_DELETED, data: blogId });

          // update searchResult
          if (searchText) {
            const updatedSearchResult = searchResult.filter(
              (blog) => blog.id !== blogId
            );
            setSearchResult(updatedSearchResult);
          }
          toast.success('Blog deleted successfully');
        }
      } catch (error) {
        profileDispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    }
  };

  //* Edit Blog
  const handleEditBlog = async (id, data, uploadedImage, thumbnail) => {
    const formData = new FormData();

    // Append newly uploaded image if available
    if (uploadedImage) {
      formData.append('thumbnail', uploadedImage);
    } else {
      // If no new image is uploaded, append the existing thumbnail
      formData.append('thumbnail', data?.thumbnail[0] || thumbnail);
    }

    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('tags', data.tags);

    try {
      const response = await api.patch(`${baseURL}/blogs/${id}`, formData);

      if (response.status === 200) {
        profileDispatch({
          type: actions.profile.DATA_EDITED,
          data: response.data,
        });
        blogDispatch({ type: actions.blog.DATA_EDITED, data: response.data });
        toast.success('Blog updated successfully.');
        navigate(`/blogs/${response.data?.id}`);
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return {
    handleToggleFavorite,
    handleToggleLike,
    handleCreateBlog,
    handleDeleteBlog,
    handleEditBlog,
  };
};

export default useBlogActions;
