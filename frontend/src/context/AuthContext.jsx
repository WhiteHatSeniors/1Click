import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
  const val = useContext(AuthContext);
  //Need to throw error if value is being acesed outside the context defined
  return val;
};

const reducer = (state, action) => {
  // console.log("HHHHHHHHHHHHHHHHHHA")
  if (action.type === 'SIGNUP') {
    return { user: null, flag: 'signed up' }; //NOT IMPLEMENTING AUTO REGISTRATION ON SIGNUP
  } else if (action.type === 'LOGIN') {
    // console.log("HAAAAAAAAAH ",action.payload)
    return { user: action.payload };
  } else if (action.type === 'LOGOUT') {
    return { user: null };
  } else return state;
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user:null
    // user:  fetch('/api/check-user', {credentials: "same-origin"}).then(res=>res.json()).then(data=>{ 
    //   if(data?.user) {
    //     console.log(data)
    //     return data.user;
    //   } 
    //   else return null;
    // } )
  });

  return (
    <AuthContext.Provider value={{ dispatch, state }}>
      {children}
    </AuthContext.Provider>
  );
};
