import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucc, setIsSucc] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (signUpData) => {
    setIsSucc(false);
    setIsLoading(true);
    setError(false);

    // const {
    //   location,
    //   name,
    //   password, confirmPassword,
    //   selectedLanguages, selectedGenres, email, phone
    // } = signUpData

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(signUpData)
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.log(data.errir, res);
      setIsLoading(false);
      setIsSucc(false);
      setError(data.error);
      console.log('Hisham');
      //Some error -  refer to userController to see what error was thrown and most imp-the err property name
    } else if (res.ok) {
      dispatch({ type: 'SIGNUP' });
      // localStorage.setItem("user", JSON.stringify(data));
      setIsSucc(true);
      setIsLoading(false);
      setError(false);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1000);
    }
  };

  // console.log(error);
  return { signup, error, isLoading, isSucc };
}

export default useSignup;
