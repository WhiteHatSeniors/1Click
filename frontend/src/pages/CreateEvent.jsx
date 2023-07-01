import Multiselect from 'multiselect-react-dropdown';
import {  useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { topics, languages, fields } from '../utils/multiselect-options';
import 'react-phone-number-input/style.css'
import PhoneInput,{ isValidPhoneNumber } from 'react-phone-number-input'
import Map from '../components/Map';
import { useAuthContext } from '../context/AuthContext';
import useCreateEvent from '../hooks/useCreateEvent';

const SignUpForm = () => {

  const {state} = useAuthContext()
  const {create, error, isLoading, isSucc} = useCreateEvent()

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(state?.user?.email || '');
  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [gender, setGender] = useState('all');
  const [minAge, setMinAge] = useState('17')
  const [maxAge, setMaxAge] = useState('25')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [url, setUrl] = useState('')
  const [selectedFields, setSelectedFields] = useState([])
  const [desc, setDesc] = useState('')
  const [details, setDetails] = useState({ industry:"all", status:"all"}) //Stores occupation,organisation, degree or college
  const [address, setAddress] = useState({});

const upperFirst = (fields) => {
  console.log(fields)
 return fields.map(field => { return {"key":field.key[0].toUpperCase() + field.key.slice(1)}})
}
const lowerFirst = (fields) => fields.map(field => field[0].toLowerCase() + field.slice(1))

const langDefault = selectedLanguages.map((el) => {
  return { key: el };
})

const topicsDefault = selectedTopics.map((el) => {
  return { key: el };
})

const fieldsDefault = selectedFields.map((el) => {
  return { key: el };
})



  const handleNextStep = () => {
    if (step === 1 && (!email.trim() || !name.trim()) || !desc.trim()) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    if (step === 2 && (!phone.trim() || selectedLanguages.length === 0 || selectedTopics.length === 0)) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    // if(step===3 && (!(minAge.toString().trim()) || !(maxAge.toString().trim()))){
    //   toast.error('Please fill in all the required fields. correctly');
    //   return;
    // }


    if(step===4 && (!(address.name) || selectedFields.length==0)){
      toast.error('Please fill in all the required fields.');
      return;
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone.trim() || selectedLanguages.length === 0 || selectedTopics.length === 0) {
      toast.error('Please fill in all the required fields.');
      return;
    }


    if (!name.trim()) {
      toast.error('Please enter a valid name.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    //Checking if phone number is valid
    if(!isValidPhoneNumber(phone)){
      toast.error('Please enter a valid phone number');
      return;
    }

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    if (date1 > date2) {
      toast.error("Event starts after it ends, doesn't make sense!");
      return;
    } 

    const todayDate=new Date()
    console.log(date2, todayDate, endDate<todayDate)
    if(date2<todayDate){
      toast.error("Event expired!");
      return;
    } 
    
    

    if(isNaN(minAge) || isNaN(maxAge)){
      toast.error('Age should be a valid number');
      return;
    }

    if(parseInt(minAge) > parseInt(maxAge)){
      toast.error('Please enter valid minimum age and maximum age');
      return;
    }

    if(parseInt(minAge)<=0 || parseInt(maxAge)<=0){
      toast.error('Please enter valid minimum age and maximum age');
      return;
    }

    // if (!(details?.organization?.trim())){
    //   toast.error('Please enter the relevant Organization/College/University name!');
    //   return;
    // }
      

    if (!(desc.trim())){
      toast.error('Your description is empty. Describe yourself please!');
      return;
    }

    if(selectedFields.length==0){
      toast.error('Please select the relevant fields');
      return;
    }

    if(!(address.name)){
      toast.error('Please enter the venue!');
      return;
    }

        const data ={
          description: desc.trim(),
          name,
          language:selectedLanguages[0], topics:selectedTopics, fields: lowerFirst(selectedFields), email, phone, status: details.status, industry: details.industry,minAge, maxAge,startDate,endDate, coordinates:address.coordinates, venue:address.name, location:address.location, url,genders: gender, uid:state.user._id
        }
    
        console.log(JSON.stringify(data))
        create(data)

  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className={step!==4 ? "mx-auto block p-6 max-w-sm bg-white rounded-lg border border-gray-300 shadow-md mt-14 mb-14" : "mx-auto block p-6 w-96 md:w-[30%] bg-white rounded-lg border border-gray-300 shadow-md mt-14 mb-14"}>
      {error && (
       <div className="p-4 mb-7 w-full text-center text-sm text-red-800 rounded-lg bg-red-200  dark:text-red-700 " role="alert"> {error}!
     </div>
      )}
      {isSucc && (
        <div className="p-4 mb-7 w-full text-center text-sm text-green-800 rounded-lg bg-green-200  dark:text-green-700 " role="alert"> Succesfully signed in!</div>
      )}
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-10 text-center">Event Registration</h1>
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        {step === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Event Name: *
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Contact Email: *
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-8 w-full">
      <label htmlFor="description" className="text-md font-semibold mb-2 block">
        Event description *
      </label>
      <textarea
      required
        id="description"
        className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none block"
        placeholder="Enter description for attendees.."
        value={desc}
        onChange={e => setDesc(e.target.value)}
      ></textarea>
    </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={isLoading}
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8">
              <label htmlFor="phone" className="block mb-2 font-medium">
                Contact Number: *
              </label>
              <PhoneInput
      placeholder="Enter phone number"
      value={phone}
      defaultCountry='IN'
      onChange={setPhoneNumber}/>
            </div>
            <div className="mb-8">
              <label htmlFor="gender" className="block mb-2 font-medium">
                Attendees gender: *
              </label>
              <select
        id="gender"
        className="px-2 py-1 border rounded w-full"  required onChange={(e)=>setGender(e.target.value) }
        defaultValue="all"
      >
        <option value="male" >Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
        <option value="all">All</option>
      </select>
            </div>
            <div className="mb-8">
              <label htmlFor="languages" className="block mb-2 font-medium">
                Language: *
              </label>
             <Multiselect
          displayValue="key"
          className='bg-white text-black'
          // onKeyPressFn={function noRefCheck(){}}
          selectedValues={langDefault}
          onRemove={(e) => setSelectedLanguages(e.map((ele) => {
            return ele.key
          }))}
          // onSearch={function noRefCheck(){}}
          selectionLimit={1}
          onSelect={(e) => setSelectedLanguages(e.map((ele) => {
            return ele.key
          }))}
          options={[...languages, {key: 'All'}]}
          showCheckbox
          placeholder={'Select Languages'}
        />

            </div>
            <div className="mb-8">
              <label htmlFor="topics" className="block mb-2 font-medium ">
                Relevent topic tags: *
              </label>
              <Multiselect
              id="topics"
          displayValue="key"
          className='bg-white'
          // onKeyPressFn={function noRefCheck(){}}
          selectedValues={topicsDefault}
          // selectionLimit={1}
          onRemove={(e) => setSelectedTopics(e.map((ele) => {
            return ele.key
          }))}
          // onSearch={function noRefCheck(){}}
          onSelect={(e) => setSelectedTopics(e.map((ele) => {
            return ele.key
          }))}
          options={topics}
          placeholder={'Select Topics'}
          showCheckbox
        />
            </div>
            <div className="flex justify-end">
               <button
                type="button"
                className="px-4 py-2 bg-blue-200 text-gray-800 rounded mr-2"
                onClick={handlePreviousStep} 
              >
                Previous
              </button>
               <button type="button" className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleNextStep} >
                Next
              </button>
            </div>
          </>
        )}

{step === 3 && (
          <>
           <div className="flex mb-8">
            <div className="w-1/2 mr-2">
          <label className="block mb-2 font-medium" htmlFor="startDate">
            Start Date *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            required
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block mb-2 font-medium" htmlFor="endDate">
            End Date *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            required
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        </div>

        <div className="flex mb-8">
          <div className="w-1/2 mr-2">
            <label className="block mb-2 font-medium" htmlFor="minAge">
              Minimum Age 
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="minAge"
              required
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block mb-2 font-medium" htmlFor="maxAge">
              Maximum Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="maxAge"
              required
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </div>
        </div>
            <div className="mb-8">
              <label htmlFor="topics" className="block mb-2 font-medium ">
                Working Status of Attendees 
              </label>
              <select
        id="status"
        className="px-2 py-1 border rounded w-full" value={details.status}  onChange={(e)=>setDetails(prev => {return {...prev, status:e.target.value}})} 
      >
        <option value="working">Working</option>
        <option value="student">Student</option>
        <option value="all">All</option>
      </select>
            </div>
            <div className="mb-8">
              <label htmlFor="industry" className="block mb-2 font-medium ">
                Releveant degrees/industries:
              </label>
              {/* <Multiselect
          displayValue="key"
          className='bg-white text-black'
          selectedValues={langDefault}
          onRemove={(e) => setSelectedLanguages(e.map((ele) => {
            return ele.key
          }))}
          // onSearch={function noRefCheck(){}}
          onSelect={(e) => setSelectedLanguages(e.map((ele) => {
            return ele.key
          }))}
          options={languages}
          showCheckbox
          placeholder={'Select Industries/degrees'}
        /> */}
              <select
        id="status"
        className="px-2 py-1 border rounded w-full" value={details.industry} onChange={(e)=>setDetails(prev => {return {...prev, industry:e.target.value}})} 
      >
        <option value="engineering">Engineering</option>
        <option value="medical">Medical</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option> 
        <option value="management">Management</option> 
        <option value="computers">Computers</option>
        <option value="arts">Arts</option>
        <option value="law">Law</option>
        <option value="all">All</option>
      </select>
            </div>
            <div className="flex justify-end">
               <button
                type="button"
                className="px-4 py-2 bg-blue-200 text-gray-800 rounded mr-2"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
               <button type='button' className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleNextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {step===4 && (<>
            <div className="mb-8">
              <label htmlFor="url" className="block mb-2 font-medium">
                Relevant link/URL:
              </label>
              <input type="url" id="url" className="w-full p-2 border border-gray-300 rounded" value={url} onChange={(e)=>setUrl(e.target.value)} />
            </div>
            <div className="mb-8">
              <label htmlFor="industry"  className="block mb-2 font-medium ">
              Data you want to gather: *
              </label>
              <Multiselect
          displayValue="key"
          className='bg-white text-black'
          selectedValues={upperFirst(fieldsDefault)}
          onRemove={(e) => setSelectedFields(e.map((ele) => {
            return ele.key[0].toUpperCase() + ele.key.slice(1);
          }))}
          // onSearch={function noRefCheck(){}}
          onSelect={(e) => setSelectedFields(e.map((ele) => {
            return ele.key[0].toUpperCase() + ele.key.slice(1);
          }))}
          options={upperFirst(fields)}
          showCheckbox
          placeholder={'Select the fields'}
        />
        </div>
        <div className="mb-8">
          <Map address={address} setAddress={setAddress} />
        </div>
    <div className="flex justify-end">
               {(!isLoading || !isSucc) && <button
                type="button"
                className="px-4 py-2 bg-blue-200 text-gray-800 rounded mr-2"
                onClick={handlePreviousStep} disabled={isLoading}
              >
                Previous
              </button>}
               <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded"  disabled={isLoading || isSucc}>
                {isLoading? 'Loading...':'Sign Up'}
              </button>
            </div>
        </>)}

      </form>
    </div>
  );
};

export default SignUpForm;


