import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css';
import ReactMapGL from 'react-map-gl';
import React,{useState} from 'react';
// import dotenv from 'dotenv';

// dotenv.config();

function App() {
  const token="pk.eyJ1Ijoic2hvdXJqYTk5IiwiYSI6ImNsNGpkbG5kNDAyOHUza292eDltazk5dGUifQ.xdJmlXm5MJWYOBuHzcWbFw";
  console.log(token);
  const [viewport,setViewport]=useState({
    width:400,
    height:400,
    latitude:37.7645,
    longitude:-122.3456,
    zoom:8
  })
  return(
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoic2hvdXJqYSIsImEiOiJjbDRxdXNpZ2QwdjNuM2tuNWowczR1eWtwIn0.Acef3ZdNxONJd8XP9r2ixg"
      // width="100%"
      // height="100%"
      // transitionDuration="200"
      // mapStyle={"mapbox://styles/mapbox/streets-v9"}
      onViewportChange={(viewport)=>setViewport(viewport)}
    />
    </div>
  )
}

export default App;
