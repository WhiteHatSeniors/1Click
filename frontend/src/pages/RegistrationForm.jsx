import {  useLocation, useNavigate } from "react-router-dom";
import useRegisterEvent from "../hooks/useRegisterEvent";
import { useState } from "react";
import { toast } from "react-toastify";

const RegistrationForm = () => {

  const location = useLocation();
  const [registered, setRegistered] = useState(false)
  const [info, setInfo] = useState({});
  const { register, error, isLoading, isSucc }=useRegisterEvent()

  const fields = location.state.fields
  const eid = location.state.eid

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!registered) register(info, true, eid);
    // if(!registered && !error) {
    //   toast.success("Registered successfully!");
    //   // setInfo(prev=>{
    //   //   fields.forEach(field=> prev[field]="")
    //   //   return prev
    //   // })
    // }
    setRegistered(prev => !prev)
  };

  return (
    <div className="mx-auto block p-6 max-w-sm bg-white rounded-lg border border-gray-300 shadow-md mt-14 mb-14">
      {error && (
       <div className="p-4 mb-7 w-full text-center text-sm text-red-800 rounded-lg bg-red-200  dark:text-red-700 " role="alert"> {error}
     </div>
      )}
      {isSucc && (
        <div className="p-4 mb-7 w-full text-center text-sm text-green-800 rounded-lg bg-green-200  dark:text-green-700 " role="alert">Succesfully registered!</div>
      )}
      <div className="bg-gray-100 py-3 px-4">
        <h2 className="text-lg text-center font-bold">Registration Form</h2>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          {fields.map((field ,id) => (
            <div key={id} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                // type={field}
                id={id}
                name={id}
                placeholder={field}
                // value={info[field]}
                onChange={(e)=>setInfo(prev=>{
                  prev[field]=e.target.value
                  return prev
                })}
              />
            </div>
          ))}
          <div className="flex justify-center mt-14">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
