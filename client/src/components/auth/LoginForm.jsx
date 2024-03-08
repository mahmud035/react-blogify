import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import InputField from '../ui/InputField';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (formData) => {
    //* API call will return (accessToken, refreshToken and Logged in User Information)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const accessToken = token.accessToken;
          const refreshToken = token.refreshToken;

          // set refreshToken, accessToken and userId into localStorage (for persisting the userInfo)
          localStorage.setItem('refreshToken', refreshToken);
          const authInfo = { accessToken, userId: user.id };
          localStorage.setItem('authInfo', JSON.stringify(authInfo));

          // set authInfo into AuthContext (for in-memory auth management)
          setAuth({ user, accessToken, refreshToken });
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
      setError('root.random', {
        type: 'random',
        message: `${error?.response?.data?.error}`,
      });
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(handleLogin)}>
      {/* Email */}
      <InputField label="Email" error={errors?.email}>
        <input
          {...register('email', {
            required: 'Email ID is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please provide valid email address.',
            },
          })}
          type="email"
          id="email"
          name="email"
          className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none ${
            errors?.email
              ? 'border-red-500 focus:border-red-500'
              : 'border-white/20 focus:border-indigo-500'
          }`}
        />
      </InputField>

      {/* Password */}
      <InputField label="Password" error={errors?.password}>
        <input
          {...register('password', {
            required: 'Password is required',
          })}
          type="password"
          id="password"
          name="password"
          className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none ${
            errors?.password
              ? 'border-red-500 focus:border-red-500'
              : 'border-white/20 focus:border-indigo-500'
          }`}
        />
      </InputField>

      {/* Show error message if user is not found */}
      {errors.root && (
        <p className="pb-3 text-red-500">{errors?.root?.random?.message}</p>
      )}

      {/* Submit Button */}
      <div className="mb-6">
        <button
          type="submit"
          className="w-full p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
