import { useQuery } from '@tanstack/react-query';
import {useEffect} from 'react'
import AxFetch from '../utils/axios';
import EventCard from '../components/EventCard';

function MyEvents() {

  const getMyEvents = async () => {
    const res = await AxFetch.get('/api/my-events', { validateStatus: false })
    console.log(res)
    return res.data;
  }

  const { data, status, error, isLoading, refetch } = useQuery(["my-events"], getMyEvents, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // retry: false,
    // enabled: false
  })

  // useEffect(() => {
  //    console.log(status, data)
  // }, [status, data])

  return (
    <>
    {!isLoading && data.length>0 ? <div className="container mx-auto p-4 pb-20">
      <h1 className="text-3xl text-center font-bold mt-8 mb-12">My Events</h1>
      <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3 items-start">
        {data && data.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div> : <h1 className='text-3xl text-center font-bold mt-8 mb-12'>You havent registered for any events</h1>}
    {isLoading && <div className="">Loading</div>}
    </>
  )
}

export default MyEvents