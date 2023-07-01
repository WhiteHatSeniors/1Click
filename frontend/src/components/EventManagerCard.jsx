import { AiFillCalendar, AiFillInfoCircle, AiOutlineEnvironment } from 'react-icons/ai';
import { FiInfo } from 'react-icons/fi';
import { BiLinkExternal } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AxFetch from '../utils/axios';
import { useQuery } from '@tanstack/react-query';

const EventManagerCard = ({ event }) => {
  const { name, startDate, endDate, language, email, phone, topics, venue, location, fields, description, minAge, maxAge, industry, status, genders } = event;
  const [showInfo, setShowInfo] = useState(false);

  const {state} = useAuthContext()
  // console.log(state?.user, fields)

  const navigate = useNavigate()

//   const onRegisterForm=()=>{
//         setRegistered(true)
//   }


  const handleNavigate =(e) =>{
    
      e.preventDefault();
        navigate('/attendee-details', {state:{
            event, fields
        }})
  }

  const isEventUnderway = new Date(startDate) <= new Date();
  const label = isEventUnderway ? 'Event underway' : 'Event yet to start';

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-100 py-2 px-3 flex justify-between">
        <Link state={event} to='/event-description' className='text-sm font-bold mb-2 flex items-center hover:text-green-300'><BiLinkExternal /></Link>
      </div>
      <div className="bg-zinc-200 py-3 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">{name}</h2>
          <div className={`text-sm px-3 py-2 rounded-lg text-white  ${isEventUnderway ? 'bg-blue-500' : 'bg-green-500'}`}>
            {label}
          </div>
        </div>
      </div>

      <div className="p-4">
      <div className="flex items-center mb-2">
          <AiFillCalendar className="text-gray-400 mr-1" />
          <span className="text-gray-600">{startDate}</span>
          <span className="text-gray-400 mx-1">-</span>
          <span className="text-gray-600">{endDate}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600">{venue}</span>
          <span className="text-gray-400 mx-1">|</span>
          <span className="text-gray-600">{location}</span>
        </div>
      </div>
        
        <button className={`text-white bg-green-500 px-3 text-center py-2 w-full mx-0 font-sm focus:outline-none hover:bg-green-800 `} onClick={handleNavigate}>
           View Details
        </button>
    </div>
  );
};

export default EventManagerCard;
