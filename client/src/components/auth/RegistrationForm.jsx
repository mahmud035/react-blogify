import { useState } from 'react';
import { useForm } from 'react-hook-form';
import eyeCloseIcon from '../../assets/icons/eye-close.svg';
import eyeOpenIcon from '../../assets/icons/eye-open.svg';
import useRegistration from '../../hooks/auth/useRegistration';
import InputField from '../ui/InputField';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });
  const { handleRegistration } = useRegistration();

  //* Registration
  const onSubmit = (formData) => {
    handleRegistration(formData, setError);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="">
      {/* First Name */}
      <InputField label="First Name" error={errors?.firstName}>
        <input
          {...register('firstName', { required: 'First Name is required.' })}
          type="text"
          id="firstName"
          name="firstName"
          className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none ${
            errors?.firstName
              ? 'border-red-500 focus:border-red-500'
              : 'border-white/20 focus:border-indigo-500'
          }`}
        />
      </InputField>

      {/* Last Name */}
      <InputField label="Last Name" error={errors?.lastName}>
        <input
          {...register('lastName', { required: 'Last Name is required.' })}
          type="text"
          id="lastName"
          name="lastName"
          className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none ${
            errors?.lastName
              ? 'border-red-500 focus:border-red-500'
              : 'border-white/20 focus:border-indigo-500'
          }`}
        />
      </InputField>

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
      <div className="flex relative">
        <InputField label="Password" error={errors?.password}>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Password can be maximum 20 characters.',
              },
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

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer absolute right-4 top-11"
        >
          {showPassword ? (
            <img src={eyeOpenIcon} alt="eye-open" />
          ) : (
            <img src={eyeCloseIcon} alt="eye-close" />
          )}
        </span>
      </div>

      {/* Show error message */}
      {errors.root && (
        <p className="pb-3 text-red-500">{errors?.root?.random?.message}</p>
      )}

      {/* Submit */}
      <div className="mb-6">
        <button
          type="submit"
          className="w-full p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
