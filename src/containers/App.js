import React, { useState, useEffect } from "react";
import WellList from "../components/WellList";
import PlaceBox from "../components/PlaceBox";
import "./App.css";

function App() {
  // const [robots, setRobots] = useState([]);
 // const [Placefield, setPlacefield] = useState("");
  // const [count, setCount] = useState(0); // for demo purposes
  const [place, setplace] = useState([0, 0]);
  const [fullWells, setFullWell] = useState([]);
  const[isInPlate, SetIsinPlate]=useState(false);
  const[report, SetReport]=useState('');
  useEffect(()=>{},[fullWells, place, isInPlate]);
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((users) => {
  //       setRobots(users);
  //     });
  //   // console.log(count)
  // }, []); // if you add count, only run if count changes.

  // const onPlaceChange = (event) => {
  //   setPlacefield(event.target.value);

  //   var a = event.target.value;
  //   if (a.length === 3) {
  //     console.log("heeeeeeeey Im ready");
  //   }
  //   setplace(a);
  //  // console.log(place);
  //   ///////////////Eshtebah ro handle con!!
  // };
  const CheckPlate=(x,y)=>{
    if (
      x > 0 &&
      x < 6 &&
      y > 0 &&
      y < 6
    ){
      SetIsinPlate(true);
    }else{
      SetIsinPlate(false);
    }
  }
  const onPlaceXChange = (event) => {
  //  setPlacefield(event.target.value);
    var currentPlace = place;
    CheckPlate(event.target.value * 1, currentPlace[1]);
    setplace([event.target.value * 1, currentPlace[1]]);
       ///////////////Eshtebah ro handle con!!
  };
  const onPlaceYChange = (event) => {
    //setPlacefield(event.target.value);
    var currentPlace = place;
    CheckPlate(currentPlace[0], event.target.value * 1);
    setplace([currentPlace[0], event.target.value * 1]);
    ///////////////Eshtebah ro handle con!!
  };
  // const filteredRobots = robots.filter((robot) => {
  //   return robot.name.toLowerCase().includes(Placefield.toLowerCase());
  // });

  return (
    <div className="tc">
      <h1 className="f1">Robotic Pipette</h1>
      {/* <button onClick={()=>setCount(count+1)}>Click Me!</button>
        <button onClick={()=>{
          var currentPlace=place;
          //setplace([currentPlace[0],event.target.value]);
          console.log(place);
        }}>Move!</button> */}
      <div className="mainLayout">
        <div className="CommandPalette">
          <div className="dib">
            <span className="di">Place</span>
            <PlaceBox placeChange={onPlaceXChange} ax={"X"} />
            <PlaceBox placeChange={onPlaceYChange} ax={"Y"} />
          </div>
          <div className="dib arrows">
            <div>
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-navy"
                onClick={() => {
                CheckPlate(place[0] + 1, place[1]);
                setplace([place[0] + 1, place[1]]);
                }}
              >
                N
              </button>
            </div>
            <button
              className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
              onClick={() => {
                CheckPlate(place[0], place[1] - 1);
                setplace([place[0], place[1] - 1]); }}
            >
              W
            </button>
            <button
              className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
              onClick={
                () => {
                  CheckPlate(place[0] - 1, place[1]);
                  setplace([place[0] - 1, place[1]]); }}
            >
              S
            </button>
            <button
              className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
              onClick={() => {
                CheckPlate(place[0], place[1] + 1);
                setplace([place[0], place[1] + 1]); }}
            >
              E
            </button>
          </div>
          <div>
            {
            (!fullWells.some(x=>x===((5-place[0])*5)+(place[1])) && isInPlate)&&
            <button
              className="ma2 f6 link dim ph3 pv2 mb2 dib white bg-dark-pink"
              onClick={() => {
                if (
                  place[0] > 0 &&
                  place[0] < 6 &&
                  place[1] > 0 &&
                  place[1] < 6
                ) {
                  let PlaceForDrop = (5 - place[0]) * 5 + place[1] * 1;
                  let currentFulls = fullWells;
                  currentFulls.push(PlaceForDrop);
                  setFullWell(currentFulls);
                  setplace([place[0],place[1]]);
                }
              }}
            >
              DROP
            </button>}
           
          </div>
        </div>

        <div className="dib">
          <WellList place={place} fullWells={fullWells} isInPlate={isInPlate}/>
        </div>
        <div className="dib">
          <button
              className="ma2 f6 link dim ph3 pv2 mb2 dib white bg-dark-green"
              onClick={() => {
                let isFull=isInPlate?(fullWells.some(x=>x===((5-place[0])*5)+(place[1]))?"FULL":"Empty"):"ERR";
               SetReport("The place is("+place[0]+", "+place[1]+", "+isFull+")");
              }}
            >
              REPORT
            </button>
            <span className="db white">{report}</span>
            </div>
      </div>
    </div>
  );
}

export default App;
