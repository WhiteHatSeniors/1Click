import { useQuery } from '@tanstack/react-query';
import {useEffect} from 'react'
import AxFetch from '../utils/axios';
import EventManagerCard from '../components/EventManagerCard';

function EventsManager() {

  const getListedEvents = async () => {
    const res = await AxFetch.get('/api/list', { validateStatus: false })
    // console.log(res)
    return res.data;
  }

  const { data, status, error, isLoading, refetch } = useQuery(["listed-events"], getListedEvents, {
    // enabled: false
  })

  useEffect(() => {
     console.log(status, data)
  }, [status, data])

  return (
    <>
    {!isLoading && data.length>0 ? <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mt-8 mb-12">Events Manager</h1>
      <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3 items-start">
        {data?.map((event, index) => (
          <EventManagerCard key={index} event={event} />
        ))}
      </div>
    </div> : <h1 className='text-3xl text-center font-bold mt-8 mb-12'>No events listed by you.</h1>}
    {isLoading && <div className="">Loading</div>}
    </>
  )
}

export default EventsManager