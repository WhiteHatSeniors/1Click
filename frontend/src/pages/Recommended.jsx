import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import AxFetch from '../utils/axios';
import EventCard from '../components/EventCard';
import DummyEventCard from '../components/DummyEventCard';
import { useAuthContext } from '../context/AuthContext';

function Recommended() {
  const [ page, setPage ] = useState(1)
  const [events, setEvents] = useState([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const [continuousLoad, setContinuousLoad] = useState(false)


  const { state } = useAuthContext()

  useEffect(() => {
    const getRecommended = async () => {
      console.log(Date.now(),"Requested for page", page)
      const res = await AxFetch.get(`/api/recommended/${page}`, { validateStatus: false })
      console.log(Date.now(),"DATA RECIEVED FOR PAGE",page,"DATA:",res.data)
      return res.data;
    }
    console.log(Date.now(),"BEGINNING REQUEST FOR NEXT PAGE", page)
    getRecommended(page).then((data) => {
        setEvents(prevEvents => [...prevEvents, ...data])
        console.log(Date.now(),"Added events")
        setContinuousLoad(false)
    })
  }, [page])


  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    console.log("HANDLE SCROLL HAS BEEN ACTIVATED!!")
    if (scrollPercentage > 0.90) { 
      console.log("Reached bottom")
      setContinuousLoad(true)
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      {!isLoadingEvents && events.length > 0 ? <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center font-bold mt-8 mb-12">{state?.user ? "Recommended Events For You" : "Events"}</h1>
        <div onScroll={handleScroll} style={{height:'70vh'}} className="grid gap-9 md:grid-cols-2 lg:grid-cols-3 items-start overflow-auto">
          { console.log("[COMPONENT RELOAD OCCURRED] Total events displayed now:",events.length) }
          {events?.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
          {continuousLoad && <><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /><DummyEventCard /></>}
        </div>
      </div> : <h1 className='text-3xl text-center font-bold mt-8 mb-12'>No Recommended Events for now</h1>}
      {isLoadingEvents && <div className="text-xl text-center font-bold mt-8 mb-12">Loading</div>}
    </>
  )
}

export default Recommended