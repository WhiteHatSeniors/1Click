import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useCreateEvent() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucc, setIsSucc] = useState(null);
  const navigate = useNavigate();

  const create = async (registerData) => {
    setIsSucc(false);
    setIsLoading(true);
    setError(false);

    const res = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.log(data.error, res);
      setIsLoading(false);
      setIsSucc(false);
      setError(data.error);
      // console.log('Hisham');
      //Some error -  refer to userController to see what error was thrown and most imp-the err property name
    } else if (res.ok) {
      setIsSucc(true);
      setIsLoading(false);
      setError(false);
      //   setTimeout(() => {
      navigate('/list', { replace: true });
      //   }, 1000);
    }
  };

  // console.log(error);
  return { create, error, isLoading, isSucc };
}

export default useCreateEvent;
