import { useAuthContext } from '../context/AuthContext';

function useLogout() {
  const { dispatch } = useAuthContext();

  const logout = () => {
    const response = fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    dispatch({ type: 'LOGOUT' });
  };
  return logout;
}
export default useLogout;
