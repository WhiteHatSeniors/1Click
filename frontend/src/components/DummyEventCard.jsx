import React, { useState } from 'react';
import { FiInfo } from "react-icons/fi";
import { BiLinkExternal } from "react-icons/bi";
import { AiFillCalendar } from "react-icons/ai";
import { GoCopy } from "react-icons/go";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const DummyEventCard = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg">
          {/* {isSucc && (
            <div className="p-4 mb-7 w-full text-center text-sm text-green-800 rounded-lg bg-green-200  dark:text-green-700 " role="alert"> Succesfully registered</div>
          )} */}
          <div className="bg-gray-100 py-2 px-3 flex justify-between">
            <h2 className="text-sm font-bold mb-2 flex items-center">
              <span className="text-gray-600">Some km away</span>
              <div className="relative ml-2">
                <FiInfo
                  className="text-gray-500 cursor-pointer"
                />
              </div>
            </h2>
            <div className='flex'>
              <Link className='text-sm font-bold mb-2 flex items-center hover:text-green-300'><BiLinkExternal /></Link>
              <button className='mx-2 mb-2'><GoCopy /></button>
            </div>
    
          </div>
          <div className="bg-zinc-200 py-3 px-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">{name}</h2>
              <div className={`text-sm px-3 py-2 rounded-lg text-white`}>
                {"Loading"}
              </div>
            </div>
            <div className="flex flex-wrap mt-1">
                <span
                  className="bg-white text-gray-700 rounded-full px-2 py-1 text-xs mr-1 mt-1"
                >
                  {"Loading..."}
                </span>
            </div>
          </div>
    
          <div className="p-4">
            <div className="flex items-center mb-2">
              <AiFillCalendar className="text-gray-400 mr-1" />
              <span className="text-gray-600">13/13/2099</span>
              <span className="text-gray-400 mx-1">-</span>
              <span className="text-gray-600">13/13/2099</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-gray-600">Some cool location</span>
              <span className="text-gray-400 mx-1">|</span>
              <span className="text-gray-600">Loading</span>
            </div>
          </div>
    
          {<button className={`text-white bg-blue-600 px-3 text-center rounded-b-lg py-2 w-full mx-0 font-sm focus:outline-none hover:bg-blue-800`}>
            {"Register?"}
          </button>}
        </div>
      );
}

export default DummyEventCard;