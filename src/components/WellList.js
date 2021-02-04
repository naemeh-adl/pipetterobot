import React from "react";
import Well from "./Well";
import "./WellList.css";

const WellList = ({ place, fullWells, isInPlate }) => {
  var MyWellList = [];
  var Currentplace = (5 - place[0]) * 5 + place[1];
  for (let i = 0; i < 25; i++) {
    let isfull = fullWells.some((x) => x === i + 1);
    if (i + 1 === Currentplace) {
      MyWellList.push(<Well key={i} IsPipette={isInPlate} isfull={isfull} />);
    } else {
      MyWellList.push(<Well key={i} IsPipette={false} isfull={isfull} />);
    }
  }
  return <div className="container ">{MyWellList}</div>;
};

export default WellList;
