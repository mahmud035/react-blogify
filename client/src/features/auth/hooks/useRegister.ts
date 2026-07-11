import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { register } from '../auth.api';
import { useAuth } from '../context/AuthContext';

export function useRegister() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: ({ user }) => {
      setUser(user);
      toast.success('Account created successfully');
      navigate('/', { replace: true });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
