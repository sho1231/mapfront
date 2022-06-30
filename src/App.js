import 'mapbox-gl/dist/mapbox-gl.css'
import "./App.css";
import { format } from "timeago.js";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";
import RoomIcon from "@material-ui/icons/Room";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState,useEffect } from "react";
import Login from './components/Login'
import Register from './components/Register';

function App() {
  const myStorage=window.localStorage;

  const [country,setCountry] = useState(null);
  const [sub,setSub]=useState(false)
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const[visit,setVisit]=useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(null);
  const token ="pk.eyJ1Ijoic2hvdXJqYTk5IiwiYSI6ImNsNGpkbG5kNDAyOHUza292eDltazk5dGUifQ.xdJmlXm5MJWYOBuHzcWbFw"
  console.log(token);
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const newPin={
      username:currentUsername,
      title,
      desc,
      rating:star,
      visit,
      lat:newPlace.lat,
      long:newPlace.long
    }
    console.log(newPin);
    setSub(true)
    try{
      const res=await axios.post("/api/pins/createpin",newPin);
      setPins([...pins,res.data]);
      setSub(false);
      setViewport({...viewport, latitude:newPin.lat, long:newPin.long});
      setNewPlace(null);
    }
    catch(e){
      console.log(e);
    }
  }
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 28.6448,
    longitude: 77.216721,
    zoom: 4,
  });
  const [showRegister,setShowRegister]=useState(false);
  const [showLogin,setShowLogin]=useState(false);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude:lat, longitude:long });
  };
  const handleAddClick=(e)=>{
    console.log(e);
    console.log(e.features[0].properties.name_en)
    const [longitude,latitude] = e.lngLat;
    setCountry(e.features[0].properties.name_en);
    console.log(country);
    console.log("asdasd",longitude,latitude);
    setNewPlace({
      lat:latitude,
      long:longitude,
    })
  }
  const deletePin=async(id)=>{
    try{
    axios.delete(`/api/pins/delete/${id}`);
    setPins(pins.filter((pin)=>pin._id!==id));
    }
    catch(err){
      console.log(err);
    }

  }
  useEffect(() => {
    axios
      .get("/api/pins/getallpins")
      .then((obj) => setPins(obj.data))
      .catch((e) => console.log(e));
    setTimeout(() => {
      console.log(pins);
    }, 9000);
  }, []);
  const handleLogout=()=>{
    setCurrentUsername(null);
    myStorage.removeItem()
  }
  //const API="pk.eyJ1Ijoic2hvdXJqYTE3IiwiYSI6ImNsNHF6ajNlaDByZTgzZW4zMnZkOXB3bzIifQ.CYxZOix2QR3yDvFHLhVq3Q"
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic2hvdXJqYTE3IiwiYSI6ImNsNHZkeGl3YTE0am8zbW1sNTduc21vanAifQ.8gC1MBd9FUFV8bbKITUgmQ"
        // width="100%"
        // height="100%"
        // transitionDuration="200"
        onClick={(e)=>handleAddClick(e)}
        cursor={"pointer"}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >

        {currentUsername&&pins
          .map((p) => (
              <>
                {p.username===currentUsername&&
                <Marker
                longitude={p.long}
                latitude={p.lat}
                anchor="bottom"
                offsetLeft={-3.5*viewport.zoom}
                offsetTop={-7*viewport.zoom}
              >
                <RoomIcon
                  style={{ fontSize: 7 * viewport.zoom,
                  cursor:"pointer",
                  color:"black"
                   }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
                }
                {
                p._id===currentPlaceId&&<Popup
                  key={p._id}
                  longitude={p.long}
                  latitude={p.lat}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={()=>setCurrentPlaceId(null)}
                  anchor="bottom"
                >
                  <div className="cards">
                    <div class="items">
                      <label>Destination</label>{": "}
                      <span>{p.title}</span>
                    </div>

                    <div class="items">
                      <label>Description</label>{": "}
                      <span>{p.desc}</span>
                  </div>
                  <div class="items places">
                    <label>Places to visit:</label>{": "}
                    <span>{p.visit}</span>
                  </div>
                  <div class="items">
                      <div style={{display:"flex"}}>
                      <label>Rating</label>{": "}
                      <span className="stars" style={{paddin:0,bottom:"23px",display:"inline-flex"}}>{new Array(p.rating).fill(<StarIcon/>)}</span>
                      </div>
                  </div>
                  <div class="items">
                      <label>Created by</label>{": "}
                      <span>{p.username}</span>{" "}
                      <span>{format(p.createdAt)}</span>
                  </div>
                  <div class="items">
                    <button onClick={()=>deletePin(p._id)}>Delete pin</button>
                  </div>
                  </div>
                </Popup>
                }
                
              </>)
            )}
            {currentUsername&&newPlace&&(
              <>
              <Marker
              longitude={newPlace.long}
              latitude={newPlace.lat}
              anchor="left"
              offsetLeft={-3.5*viewport.zoom}
              offsetTop={-7*viewport.zoom}
            >
              <RoomIcon
                style={{ fontSize: 7 * viewport.zoom,
                  cursor:"pointer",
                  color:"green"
                }}
                onClick={() => handleMarkerClick(newPlace._id, newPlace.lat, newPlace.long)}
              />
            </Marker>
            <Popup
            key={newPlace._id}
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            onClose={()=>setNewPlace(null)}
            anchor="bottom"
          >
            <div className="form">
            <form onSubmit={(event)=>handleSubmit(event)}>
                      <div className="items">
                      <label>Destination:</label>{" "}
                      <input
                        type="text"
                        
                        placeholder="Enter a title here"
                        autoFocus
                        onChange={({ target: { value } }) => setTitle(value)}
                      />
                      </div>
                     <div className="items">
                     <label>Description:</label>{" "}
                      <textarea
                        type="text"
                        placeholder="Enter description"
                        autoFocus
                        rows={4}
                      
                        onChange={({ target: { value } }) => setDesc(value)}
                      />
                     </div>
                     <div className="items">
                      <label>Places to visit:</label>{" "}
                      <textarea
                      placeholder="Enter places to visit seperated by comma"
                      autoFocus
                      rows={3}
                      
                      onChange={({target:{value}})=>setVisit(value)}
                      ></textarea>
                     </div>
                      <div className="items">
                      <label>Rating</label><br/>
                      <select onChange={(e)=>setStar(e.target.value)} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      </div>
                      <input type="submit" className="subbtn" value="Add Pin"/>
                    </form>
                    {sub&&<span>please wait..submitting...</span>}
            </div>
          </Popup>
            </>
            )}
            {currentUsername?(
              <button className="Button Logout" onClick={()=>handleLogout()}>Log out</button>
            ):(
              <div className="buttons">
                <button className="Button login" onClick={()=>setShowLogin(true)}>Login</button>
                <button className="Button register" onClick={()=>setShowRegister(true)}>Register</button>
              </div>

            )}
            {showRegister&&<Register setShowRegister={setShowRegister}/>}
            {showLogin&&<Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUsername={setCurrentUsername}/>}
      </ReactMapGL>
    </div>
  );
}

export default App;
