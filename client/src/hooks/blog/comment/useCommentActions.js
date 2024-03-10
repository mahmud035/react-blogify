import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actions } from '../../../actions';
import useAxios from '../../auth/useAxios';
import useBlog from '../useBlog';

const useCommentActions = (reset = () => {}) => {
  const { blogDispatch } = useBlog();
  const { api } = useAxios();
  const { blogId } = useParams();

  //* Post Comment
  const handlePostComment = async (data) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/comment`,
        { content: data.content }
      );

      if (response.status === 200) {
        blogDispatch({
          type: actions.blog.ADD_COMMENT,
          data: response.data?.comments,
        });
        reset(); // reset comment box
        toast.success('Comment Added Successfully.');
      }
    } catch (error) {
      blogDispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  //* Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/blogs/${blogId}/comment/${commentId}`
      );

      if (response.status === 200) {
        blogDispatch({
          type: actions.blog.DELETE_COMMENT,
          data: response.data?.comments,
        });
        toast.success('Comment Deleted Successfully.');
      }
    } catch (error) {
      blogDispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return { handlePostComment, handleDeleteComment };
};

export default useCommentActions;
