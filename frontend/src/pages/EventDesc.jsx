
import { AiFillCalendar, AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai';
import { BsTag } from 'react-icons/bs';
import { IoMale, IoFemale } from 'react-icons/io5';
import { FaLink , FaMapMarkerAlt} from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

const EventDesc = () => {

  
  const loc = useLocation()

  const navigate=useNavigate()

  // console.log(loc, loc.state)

  const {
    name,
    startDate,
    endDate,
    language,
    email,
    genders,
    phone,
    topics,
    coordinates,
    venue,
    location,
    description,
    minAge,
    maxAge,
    industry,
    status,url
  } = loc.state

  const displayGenders = () => {
    if (genders.toLowerCase() === 'all') {
      return null
    } else if (genders.toLowerCase() === 'male') {
      return (
        <span className="flex items-center">
          <IoMale className="mr-1" />
          Male Only
        </span>
      );
    } else if (genders.toLowerCase() === 'female') {
      return (
        <span className="flex items-center">
          <IoFemale className="mr-1" />
          Female Only
        </span>
      );
    }
  };

  const displayAge = () => {
    if (minAge && !maxAge) {
      return `${minAge}+`;
    } else if (!minAge && maxAge) {
      return `Less than ${maxAge}`;
    } else if (minAge && maxAge) {
      return `${minAge} - ${maxAge}`;
    }
    return null;
  };

  const displayTopics = () => {
    if (topics && topics.length > 0) {
      return (
        <div className="flex flex-wrap mt-2">
          {topics.map((topic, index) => (
            <span key={index} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2">
              {topic}
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  const displayEventInfo = () => {
    if (
      language === 'all' &&
      genders === 'all' &&
      status === 'all' &&
      industry === 'all'
    ) {
      return null;
    }

    return (
      <div className="flex items-center mb-2">
        {language.toLowerCase() !== 'all' && (
          <span className="text-gray-600 mr-6">
            {language}
          </span>
        )}
        {displayGenders()}
        {status.toLowerCase() !== 'all' && (
          <span className="text-gray-600 ml-6">
            {status[0].toUpperCase() + status.slice(1)}
          </span>
        )}
        {industry.toLowerCase() !== 'all' && (
          <span className="text-gray-600 ml-6">
           {status=='working' ? 'Industry: ': 'Degree: '} {industry[0].toUpperCase() + industry.slice(1)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto block p-6 w-[90%] md:w-[70%] bg-white rounded-lg border border-gray-300 shadow-md mt-14 mb-14">
      <button onClick={()=>navigate(-1)} ><IoMdArrowRoundBack className='my-3 h-6 w-6 hover:text-gray-500'/></button>
      <h1 className="text-xl font-bold mb-4">{name}</h1>
      <div className="flex items-center text-gray-600 mb-4">
        <AiFillCalendar className="mr-2" />
        <span>{startDate} - {endDate}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-gray-600">Age:</span>
        <span className="text-gray-600 ml-2">{displayAge()}</span>
      </div>
      {displayEventInfo()}
      <div className="flex items-center mb-2">
        <AiOutlineMail className="mr-2" />
        <span className="text-gray-600">{email}</span>
      </div>
      <div className="flex items-center mb-2">
        <AiOutlinePhone className="mr-2" />
        <span className="text-gray-600">{phone}</span>
      </div>
      <div className="flex items-center mb-2">
        <BsTag className="mr-2" />
        {displayTopics()}
      </div>
      <div className="flex flex-col md:flex-row mb-2">
        <AiOutlineEnvironment className="mr-2 hidden md:flex" />
        <h2 className="text-lg font-bold mb-2 flex md:hidden">Location</h2>
        <span className="text-gray-600">{venue}, {location}</span>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Description</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      {url && (
            <div className="flex items-center mb-4">
              <FaLink className="text-gray-500 mr-2" />
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{url}</a>
            </div>
          )}
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <a href={`https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{name}</a>
            </div>
    </div>
  );
};

export default EventDesc;
