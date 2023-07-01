import  { useState } from 'react'
import { FcSearch } from 'react-icons/fc'
import AxFetch from '../utils/axios'

function SearchBar({setActive, setIsLoading, setData}) {
  const [query, setQuery] = useState("")

    const subHandler =async  (e) => {
      e.preventDefault()
      setIsLoading(true)
      try{
        const response = await AxFetch.get(`/api/search?query=${query}`)
        setData(response.data)
        // return {data:response.data,  status:response.status}
        
      }catch({response}){
        // console.log(response)
        console.log({ error:response.data.error, status:response.status })
      }finally{
        setIsLoading(false)
      }
     
      }

  return (
    <div className='text-center mb-16 mt-10'>
    <form className='flex-row' onSubmit={subHandler}>
          <input placeholder="Search by Event Name, Location, Topics..." onChange={event => setQuery(event.target.value)} onClick={event => setActive(prev => !prev)} className={/*isActive ? 'border-black border-2 px-7 py-3 w-[80%]' :*/ 'border-black border px-7 py-3 w-[60%]'} />
          <button type='submit'><FcSearch className='text-center inline-block text-4xl' /></button>
        </form>
        </div>
  )
}

export default SearchBar