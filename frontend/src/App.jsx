import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAuthContext} from "./context/AuthContext";
import SignUpForm from "./pages/SignUpForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import Recommended from "./pages/Recommended";
import EventsManager from "./pages/EventsManager";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Blogs from "./pages/Blogs";
import SearchPage from "./pages/SearchPage"
import Network from "./pages/Network";
import CreateEvent from "./pages/CreateEvent"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RegistrationForm from "./pages/RegistrationForm"
import EventDesc from "./pages/EventDesc"
// import EventManagerCard from "./components/EventManagerCard";
import EventManagerCardDesc from "./pages/EventManagerCardDesc";
import { useEffect } from "react";
import MyEvents from "./pages/MyEvents";


function App() {

  const { state, dispatch } = useAuthContext();
  
  const queryClient = new QueryClient()

  
useEffect(() => {
  const getData = async()=>{
    const res=await fetch("/api/check-user",{
      method: 'GET',
      credentials: "same-origin"
    })
    const data = await res.json()
    console.log("DAATTAAAAAAAAA ", data)
    if(data?.exists) dispatch({type:'LOGIN', payload: data.user})
    console.log(state, data.user)
  }

  getData()

},[dispatch])

  
  return (
    <>
      <Router>
      <QueryClientProvider client={queryClient} > 
        <Navbar />
      <Routes>
      <Route path="/signup" element={!state.user ? <SignUpForm /> : <Recommended />} />
      <Route path="/login" element={!state.user? <LoginForm /> : <Recommended />} /> 
      <Route path="/my-events" element={state.user? <MyEvents /> : <Recommended />} /> 
      <Route path="/reg-form" element={<RegistrationForm />} /> 
      <Route path="/" element={<Home />} />
      <Route path="/event-description" element={<EventDesc />} />
      <Route path="/recommended" element={<Recommended />} />
      <Route path="/list" element={state.user? <EventsManager /> : <SignUpForm />} />
      <Route path="/attendee-details" element={state.user? <EventManagerCardDesc /> : <SignUpForm />} />
      <Route path="/profile" element={state.user? <Profile /> : <SignUpForm />} />
      <Route path="/edit-profile" element={state.user? <EditProfile /> : <SignUpForm />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/network" element={!state.user ?<Home /> : <Network />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/create" element={state.user? <CreateEvent /> : <SignUpForm />} />
      </Routes>
      <ToastContainer />
      </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
