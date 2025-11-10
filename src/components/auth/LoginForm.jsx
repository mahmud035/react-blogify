import { useState } from 'react';
import { useForm } from 'react-hook-form';
import eyeCloseIcon from '../../assets/icons/eye-close.svg';
import eyeOpenIcon from '../../assets/icons/eye-open.svg';
import useLogin from '../../hooks/auth/useLogin';
import InputField from '../ui/InputField';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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
  const { handleLogin } = useLogin();

  //* Login
  const onSubmit = (formData) => {
    handleLogin(formData, setError);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="relative flex">
        <InputField label="Password" error={errors?.password}>
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none ${
              errors?.password
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/20 focus:border-indigo-500'
            }`}
          />
        </InputField>

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute p-0 bg-transparent border-none cursor-pointer right-4 top-11"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <img
            src={showPassword ? eyeOpenIcon : eyeCloseIcon}
            alt=""
            className="pointer-events-none"
          />
        </button>
      </div>

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
