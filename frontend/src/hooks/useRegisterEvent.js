import { useState } from 'react';
function useRegisterEvent() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucc, setIsSucc] = useState(null);

  const register = async (registerData, isRegistered, eid) => {
    setIsSucc(false);
    setIsLoading(true);
    setError(false);

    console.log(eid);
    const res = await fetch(`/api/register/${eid}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...registerData, isRegistered })
    });

    const data = await res.json();
    console.log(data);
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
    }
  };

  // console.log(error);
  return { register, error, isLoading, isSucc };
}

export default useRegisterEvent;
