import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utils';

const useRegistration = () => {
  const navigate = useNavigate();

  const handleRegistration = async (formData, setError) => {
    try {
      const response = await axios.post(`${baseURL}/auth/register`, formData);

      if (response.status === 201) {
        toast.success('Account Created Successfully!');
        navigate('/login');
      }
    } catch (error) {
      setError('root.random', {
        type: 'random',
        message: `Something went wrong: ${error?.response?.data?.error}`,
      });
    }
  };

  return { handleRegistration };
};

export default useRegistration;
