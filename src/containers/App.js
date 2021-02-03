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
  const [isInPlate, SetIsinPlate] = useState(false);
  const [initialiseX, SetinitialiseX] = useState(false);
  const [initialiseY, SetinitialiseY] = useState(false);
  const [report, SetReport] = useState("");
  useEffect(() => {}, [fullWells, place, isInPlate]);
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
  const CheckPlate = (x, y) => {
    debugger;
    if (x > 0 && x < 6 && y > 0 && y < 6) {
      SetIsinPlate(true);
    } else {
      SetIsinPlate(false);
    }
  };
  const onPlaceXChange = (event) => {
    //  setPlacefield(event.target.value);
    var currentPlace = place;
    CheckPlate(event.target.value * 1, currentPlace[1]);
    SetinitialiseX(true);
    setplace([event.target.value * 1, currentPlace[1]]);
    ///////////////Eshtebah ro handle con!!
  };
  const onPlaceYChange = (event) => {
    //setPlacefield(event.target.value);
    var currentPlace = place;
    CheckPlate(currentPlace[0], event.target.value * 1);
    SetinitialiseY(true);
    setplace([currentPlace[0], event.target.value * 1]);
    ///////////////Eshtebah ro handle con!!
  };
  // const filteredRobots = robots.filter((robot) => {
  //   return robot.name.toLowerCase().includes(Placefield.toLowerCase());
  // });
  let fileReader = new FileReader();
  const handleFileRead = (e) => {
    const content = fileReader.result;
    parseFile(content);
  };
  const OnFileReaderChanged = (event) => {
    let file = event.target.files[0];
    if (file) {
     
      fileReader.onloadend = handleFileRead;
      let contents = fileReader.readAsText(file);
      return(contents);
      // axios.post('/files', data)...
    }
  };
  const parseFile=(content)=>{
var a=content.split('\n');
a.forEach(Line => {
  //console.log(Line);
  if(Line.includes("MOVE ")&&initialiseX&&initialiseY){
    var words=Line.split(' ');
    goDirection(words[words.length-1]);
  }
  if(Line.includes("PLACE ")){
    let P=Line.split(' ');
    let axios=P[P.length-1].split(',');
    CheckPlate(axios[0]*1,axios[1]*1);
    setplace([axios[0]*1,axios[1]*1]);
    SetinitialiseX(true);
    SetinitialiseY(true);
    
  }
});
  }
  const goDirection=(dir)=>{
    console.log(dir);
    switch(dir){
      case "E":
        CheckPlate(place[0], place[1] + 1);
        setplace([place[0], place[1] + 1]);
        break;
        case "S":
          CheckPlate(place[0] - 1, place[1]);
          setplace([place[0] - 1, place[1]]);
          break;
        case "W":
          CheckPlate(place[0], place[1] - 1);
                  setplace([place[0], place[1] - 1]);
                  break;
        case "N":
          CheckPlate(place[0] + 1, place[1]);
          setplace([place[0] + 1, place[1]]);
          break;
          default:
            CheckPlate(place[0] , place[1]);
          setplace([place[0] , place[1]]);
          break;
    }
  
  }
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
            <span className="pa2 db dark-pink">Place:</span>
            <PlaceBox placeChange={onPlaceXChange} ax={"X"} />
            <PlaceBox placeChange={onPlaceYChange} ax={"Y"} />
          </div>
          {initialiseX && initialiseY && (
            <div className="dib arrows">
              <div>
                <button
                  className="f6 link dim ph3 pv2 mb2 dib white bg-navy"
                  onClick={() => {
                   goDirection("N");
                  }}
                >
                  N
                </button>
              </div>
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
                onClick={() => {
                  goDirection("W");
                }}
              >
                W
              </button>
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
                onClick={() => {
                 goDirection("S")
                }}
              >
                S
              </button>
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-navy ma1"
                onClick={() => {
                 goDirection("E");
                }}
              >
                E
              </button>
            </div>
          )}
          {(!initialiseX || !initialiseY) && (
            <span className="pa2 db dark-pink">
              Please Choose A Place At First!
            </span>
          )}
          <div>
            {!fullWells.some((x) => x === (5 - place[0]) * 5 + place[1]) &&
              isInPlate && (
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
                      setplace([place[0], place[1]]);
                    }
                  }}
                >
                  DROP
                </button>
              )}
          </div>
        </div>

        <div className="dib">
          <WellList place={place} fullWells={fullWells} isInPlate={isInPlate} />
        </div>
        <div className="dib">
          <button
            className="ma2 f6 link dim ph3 pv2 mb2 dib white bg-dark-green"
            onClick={() => {
              let isFull = isInPlate
                ? fullWells.some((x) => x === (5 - place[0]) * 5 + place[1])
                  ? "FULL"
                  : "Empty"
                : "ERR";
              SetReport(
                "The place is(" +
                  place[0] +
                  ", " +
                  place[1] +
                  ", " +
                  isFull +
                  ")"
              );
            }}
          >
            REPORT
          </button>
          <span className="pa4 db white">{report}</span>
          <div>
            <span className="pa2 db green">
              Choose A File To Execte Commands!
            </span>
            <input
              className="white ba"
              accept=".txt"
              type="file"
              id="myFile"
              name="filename"
              onChange={e=>OnFileReaderChanged(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
