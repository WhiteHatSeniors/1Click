import { useState } from "react"
import SearchBar from "../components/SearchBar"
import EventCard from "../components/EventCard"

function SearchPage() {
  const [isActive, setActive] = useState(false)
  const [data, setData] = useState(false)

    const [isLoading,setIsLoading] = useState(false)
    return (
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-3xl text-center font-bold m-8">Search for Events</h1>
        <SearchBar  setActive={setActive}  setIsLoading={setIsLoading} setData={setData} />
      {!isLoading && data.length>0 ? 
      <>
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3 items-start">
          {data?.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div> </>: <div className="p-2 mt-5 text-sm w-[50%] mx-auto text-red-800 rounded-lg bg-red-200  text-center dark:text-red-600" role="alert">
            <span className="font-medium">No Events Found</span></div>}
      {isLoading && <div className="">Loading</div>}
      </div>
    )
}

export default SearchPage