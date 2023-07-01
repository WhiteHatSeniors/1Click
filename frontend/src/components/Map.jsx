import {useCallback, useEffect, useRef, useState} from 'react'


const apiKey = import.meta.env.API_KEY;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';


// load google map api js
function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}



function Map({address, setAddress}) {

  const searchInput = useRef(null);


 const initAutocomplete = useCallback(() => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(["geometry","formatted_address","name"]);
    autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

  },[])



  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if(window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  }

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress({name: place.name , location: place.formatted_address, coordinates: {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()}});
  }


  const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
        .then(response => response.json())
        .then(location => {
          const place = location.results[0];
          const _address = {name: place.name , location: place.formatted_address, coordinates: {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()}}
          setAddress(_address);
          searchInput.current.value = _address.name
        })
  }


  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        reverseGeocode(position.coords)
      })
    }
  }



  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete())
  }, [initAutocomplete]);

// console.log(address)?

  return (
    <div className="App">
      <div>
        <div className="">
          <p className='block mb-2 font-medium'>Venue: *</p>
          <input required ref={searchInput} defaultValue={address.name} type="text" placeholder="Search location...." className="w-full p-2 border border-gray-300 rounded"/>
          {/* <button onClick={findMyLocation}>Current</button> */}
        </div>

        {/* {address && address.name && <div className="address">
          <p>Name: <span>{address?.name}</span></p>
          <p>Location: <span>{address?.location}</span></p>
          <p>Latitude and Longitude: <span>{address?.coordinates.latitude}, {address?.coordinates.longitude} </span></p>
        </div>} */}

      </div>
    </div>
  )
}

export default Map