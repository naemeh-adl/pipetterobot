import React from "react";
//import Pipette from process.env.PUBLIC_URL+'/Images/Pipette.jpg'

const Well = ({ IsPipette, isfull }) => {
  var ImageAddress = IsPipette ?(isfull? "/Images/Lab/FullPipette1.png" : "/Images/Lab/Pipette1.png"):(isfull? "/Images/Lab/FullWell.jpg" : "/Images/Lab/Well.jpg");
  return (
    <div className="tc grow bg-white br3 pa2 ma2 dib bw2 shadow-5 dib">
      <img alt="Pipes" src={process.env.PUBLIC_URL + ImageAddress} />
      <div>{/* <h2>{name}</h2>
            <p>{email}</p> */}</div>
    </div>
  );
};

export default Well;
