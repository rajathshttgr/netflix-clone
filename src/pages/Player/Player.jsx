//import React from 'react'
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const {id} = useParams();

  const navigate=useNavigate();

  const [apiData, setApiData]=useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTI1OWVmOGQyNzY4ZWRjZDFiMjZlM2EyNzljOTBiMiIsIm5iZiI6MTczMDgxNjY5NC43NzYyOTI2LCJzdWIiOiI2NzJhMjUzY2NjMWQxMjgyN2QwYzVhOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t8vKm77-UZBB9m8GT3E4gxh8bLu-8zu1mxEivzZoT2k'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back arrow icon" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}/`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
       <p>{apiData.published_at.slice(0,10)}</p>
       <p>{apiData.name}</p>
       <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
