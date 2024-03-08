import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actions } from '../../../actions';
import useAxios from '../../../hooks/useAxios';
import useBlog from '../../../hooks/useBlog';
import useGetUser from '../../../hooks/useGetUser';
import InputField from '../../ui/InputField';

const CommentBox = () => {
  const user = useGetUser();
  const { blogDispatch } = useBlog();
  const { api } = useAxios();
  const { blogId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { content: '' } });

  // Show dummy avatar if user's avatar is not found
  const userNameFirstChar = user?.firstName?.slice(0, 1)?.toUpperCase();
  const userAvatar =
    user?.avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${user?.avatar}`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${userNameFirstChar}`;

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
        reset();
        toast.success('Comment Added Successfully.');
      }
    } catch (error) {
      blogDispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="flex space-x-4 items -center">
      <img
        className="font-bold text-white avater-img hover:text-white/80"
        src={userAvatar}
        alt="Profile Image"
      />

      <div className="w-full">
        {/* Form */}
        <form action="" onSubmit={handleSubmit(handlePostComment)}>
          <InputField label="" error={errors?.content}>
            <textarea
              {...register('content', {
                required: 'Please write something about the blog!',
              })}
              className={`w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none ${
                errors?.content ? 'border-red-500 focus:border-red-500' : null
              }`}
              placeholder="Write a comment"
            ></textarea>
          </InputField>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentBox;
