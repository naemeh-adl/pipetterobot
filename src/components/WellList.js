import React from "react";
import Well from "./Well";
import "./WellList.css";

const CardList = ({ place, fullWells, isInPlate }) => {
  var MyWellList = [];
  var Currentplace=((5-place[0])*5)+(place[1]);
  for (let i = 0; i < 25; i++) {
    console.log(fullWells);
    let isfull=fullWells.some(x=>x===i+1);
    if(i+1===Currentplace){
    MyWellList.push(<Well key={i} IsPipette={isInPlate} isfull={isfull}/>);
    }else{
      MyWellList.push(<Well key={i} IsPipette={false} isfull={isfull}/>);
    }
  }
  return (
    <div className="container ">
      {
        MyWellList
        // robots.map((user, i) => {
        //   return (
        //     <Card
        //       key={i}
        //       id={robots[i].id}
        //       name={robots[i].name}
        //       email={robots[i].email}
        //       />
        //   );
        // })
      }
    </div>
  );
};

export default CardList;
