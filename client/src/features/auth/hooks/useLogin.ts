import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { login } from '../auth.api';
import { useAuth } from '../context/AuthContext';

interface LocationState {
  from?: { pathname?: string };
}

export function useLogin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from?.pathname ?? '/';

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      setUser(user);
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
