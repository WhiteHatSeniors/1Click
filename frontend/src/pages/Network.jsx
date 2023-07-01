import { useQuery } from '@tanstack/react-query';
import {useEffect} from 'react'
import AxFetch from '../utils/axios';
import UserCard from '../components/UserCard';

function Network() {

  const getRecommended = async () => {
    const res = await AxFetch.get('/api/network', { validateStatus: false })
    // console.log(res)
    return res.data;
  }

  const { data, status, error, isLoading, refetch } = useQuery(["network"], getRecommended, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    // enabled: false
  })

  useEffect(() => {
     console.log(status, data, error)
  }, [status, data])

  return (
    <>
    {data && !isLoading && <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mt-8 mb-12">Your Network</h1>
      <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>}
    {isLoading && <div className="">Loading</div>}
    </>
  )
}

export default Network