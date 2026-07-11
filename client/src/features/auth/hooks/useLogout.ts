import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../auth.api';
import { useAuth } from '../context/AuthContext';

export function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const finish = () => {
    setUser(null);
    queryClient.clear();
    navigate('/login');
  };

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logged out');
      finish();
    },
    // Even if the request fails, clear the client-side session.
    onError: finish,
  });
}
