import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import AxFetch from '../utils/axios';
import EventCard from '../components/EventCard';
import { useAuthContext } from '../context/AuthContext';

function Recommended() {
  const [ page, setPage ] = useState(1)
  const [events, setEvents] = useState([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)


  const { state } = useAuthContext()
  const getRecommended = async (page) => {
    const res = await AxFetch.get(`/api/recommended/${page}`, { validateStatus: false })
    console.log(res.data)
    return res.data;
  }

  useEffect(() => {
    // const { data, 
    //   // status, 
    //   // error, 
    //   isLoading, 
    //   // refetch
    //    } = useQuery(["recommended"], () => getRecommended(page), {
    //   refetchOnMount: false,
    //   refetchOnWindowFocus: false,
    //   retry: false,
    //   // enabled: false
    // })
    getRecommended(page).then((data) => {
      // setIsLoadingEvents(false)
      // if (status === "success") {
        setEvents(prevEvents => [...prevEvents, ...data])
      // }
    })
  }, [page])

  // console.log(state, state.user)
  // useEffect(() => {
  //    console.log(status, data)
  // }, [status, data])


  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log(scrollTop, clientHeight, scrollHeight)
    if (scrollHeight - scrollTop === clientHeight) {
      console.log("Reached bottom")
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      {!isLoadingEvents && events.length > 0 ? <div className="container mx-auto p-4 pb-20">
        <h1 className="text-3xl text-center font-bold mt-8 mb-12">{state?.user ? "Recommended Events For You" : "Events"}</h1>
        <div onScroll={handleScroll} className="grid gap-9 md:grid-cols-2 lg:grid-cols-3 items-start">
          { console.log(events.length) }
          {events?.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div> : <h1 className='text-3xl text-center font-bold mt-8 mb-12'>No Recommended Events for now</h1>}
      {isLoadingEvents && <div className="">Loading</div>}
    </>
  )
}

export default Recommended