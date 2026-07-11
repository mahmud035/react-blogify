import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Field from '@/components/ui/Field';
import { inputClass } from '@/lib/formClasses';
import { loginSchema, type LoginValues } from '../auth.schema';
import { useLogin } from '../hooks/useLogin';
import PasswordToggle from './PasswordToggle';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const { mutate, isPending } = useLogin();

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} noValidate>
      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={inputClass(Boolean(errors.email))}
        />
      </Field>

      <div className="relative">
        <Field label="Password" htmlFor="password" error={errors.password}>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={inputClass(Boolean(errors.password))}
          />
        </Field>
        <PasswordToggle
          show={showPassword}
          onToggle={() => setShowPassword((s) => !s)}
        />
      </div>

      <button type="submit" disabled={isPending} className="w-full btn-primary">
        {isPending ? 'Logging in…' : 'Login'}
      </button>
    </form>
  );
}
