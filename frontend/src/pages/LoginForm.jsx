import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import logo from '../assets/logo.png'; // Replace with your own logo or image
import { useRef } from 'react';
import useLogin from '../hooks/useLogin';

const LoginForm = () => {

    const emailRef= useRef(null)
    const passwordRef = useRef(null)
    const { login, error, isLoading, isSucc } = useLogin();

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(emailRef.current.value, passwordRef.current.value);
        login(emailRef.current.value, passwordRef.current.value);
        // console.log(error);
    }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {error && (
       <div className="p-4 mb-4 max-w-md lg:w-[25%] text-center text-sm text-red-800 rounded-lg bg-red-200  dark:text-red-700 ax-w-md shadow-lg" role="alert"> {error}!
     </div>
      )}
      {isSucc && (
        <div className="p-4 mb-4 max-w-md lg:w-[25%] text-center text-sm text-green-800 rounded-lg bg-green-200  dark:text-green-700 ax-w-md shadow-lg" role="alert"> Succesfully signed in!</div>
      )}
      <div className="max-w-md lg:w-[25%] px-12 py-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
          <h1 className="text-xl font-extrabold mx-7">Login</h1>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input type="email" id="email" className="w-full p-2 border rounded" placeholder="Enter your email" required ref={emailRef}/>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block font-semibold mb-1">Password</label>
            <input type="password" id="password" className="w-full p-2 border rounded" placeholder="Enter your password" ref={passwordRef} required />
          </div>
          <div className="mt-6 flex justify-between">
          <button type="submit" className={!isSucc? "w-full bg-blue-500 text-white py-2 px-4 rounded": "w-full bg-gray-500 text-white py-2 px-4 rounded"} disabled={isLoading || isSucc}>{isLoading? "Loading..." : "Login"}</button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/signup" className="text-blue-500" >Sign up</Link>
            <span className="text-gray-500 mx-2">|</span>
            <Link to="/forgot-password" className="text-blue-500">Forgot password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
