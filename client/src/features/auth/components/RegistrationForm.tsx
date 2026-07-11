import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Field from '@/components/ui/Field';
import { inputClass } from '@/lib/formClasses';
import { registerSchema, type RegisterValues } from '../auth.schema';
import { useRegister } from '../hooks/useRegister';
import PasswordToggle from './PasswordToggle';

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });
  const { mutate, isPending } = useRegister();

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} noValidate>
      <Field label="First Name" htmlFor="firstName" error={errors.firstName}>
        <input
          {...register('firstName')}
          type="text"
          id="firstName"
          className={inputClass(Boolean(errors.firstName))}
        />
      </Field>

      <Field label="Last Name" htmlFor="lastName" error={errors.lastName}>
        <input
          {...register('lastName')}
          type="text"
          id="lastName"
          className={inputClass(Boolean(errors.lastName))}
        />
      </Field>

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
        {isPending ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  );
}
