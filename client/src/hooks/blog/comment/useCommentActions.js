import { flushSync } from 'react-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actions } from '../../../actions';
import { baseURL } from '../../../utils';
import useAxios from '../../auth/useAxios';
import useBlog from '../useBlog';

const useCommentActions = () => {
  const { blogDispatch } = useBlog();
  const { api } = useAxios();
  const { blogId } = useParams();

  //* Post Comment
  const handlePostComment = async (data, reset, ref) => {
    try {
      const response = await api.post(`${baseURL}/blogs/${blogId}/comment`, {
        content: data.content,
      });

      if (response.status === 200) {
        // NOTE: use flushSync to update the DOM synchronously
        flushSync(() => {
          blogDispatch({
            type: actions.blog.ADD_COMMENT,
            data: response.data?.comments,
          });
          reset(); // reset comment box
        });
        // scroll to the newly added comment
        ref.current.lastChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });

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
        `${baseURL}/blogs/${blogId}/comment/${commentId}`
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
