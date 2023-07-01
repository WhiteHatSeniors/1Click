import React, { useEffect, useState } from 'react';
import { AiFillCalendar, AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai';
import { BsTag } from 'react-icons/bs';
import { IoMale, IoFemale } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import AxFetch from '../utils/axios';
import { useQuery } from '@tanstack/react-query';
import DataTable from '../components/DataTable';

const EventManagerCardDesc = () => {

  
  const loc = useLocation()
  // console.log(loc.state.fields)

  const getEventAttendees = async () => {
    const res = await AxFetch.get(`/api/list-attendees/${loc.state.event._id}`, { validateStatus: false })
    // console.log(res)
    return res.data;
  }
  
  const { data, status, isError, isLoading } = useQuery(["event-attendees"], getEventAttendees, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // retry: false,
    // // enabled: false
  })



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching attendees.</div>;
  }

  // console.log(data, loc.state.fields)
  return (
    <div className="mx-auto block p-6 w-[100%] bg-white rounded-lg border border-gray-300 shadow-md mt-14 mb-14">
      <h1 className="text-3xl text-center font-bold mt-8 mb-12">Event Attendees of {loc.state.event.name}</h1>
      {data?.length!=0 && <DataTable data={data} col={loc.state.fields} />}
      {!(data) && "Loading..."}
      {data?.length==0 && <div className='text-center'>No attendees for now!</div>}
    </div>
  );
};

export default EventManagerCardDesc;

