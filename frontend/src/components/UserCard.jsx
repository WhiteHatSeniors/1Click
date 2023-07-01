import { MdEmail, MdPhone} from "react-icons/md"

const UserCard = ({ user }) => {
  const { name, age, industry, status, email, phone, topics, organization, gender, description } = user;

  const getStatusMessage = () => {
    if (status === 'working') {
      return `Working at ${organization}`;
    } else if (status === 'student') {
      return `Studying at ${organization}`;
    } else {
      return '';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-4">
        <div className="flex flex-row justify-between">
      <h2 className="text-lg font-bold mb-2">{name} <p className=" inline text-sm text-gray-500 mb-2">{gender[0].toUpperCase()}</p></h2>
      <div className="flex flex-wrap gap-1 mb-2">
        {topics.map((topic, index) => (
          <span key={index} className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {topic}
          </span>
        ))}
      </div>
      </div>
      <p className="text-sm text-gray-500 mb-2">{age} years old {getStatusMessage()}</p>
        <p className="text-sm">{description}</p>
        <div className="flex items-center justify-between mt-4">
      <p className="flex items-center">
       <MdEmail className=" mr-2"/>{email}
      </p>
      <p className="flex items-center">
        <MdPhone className="mr-2" />{phone}
      </p>
    </div>
    </div>
  );
};

export default UserCard;
