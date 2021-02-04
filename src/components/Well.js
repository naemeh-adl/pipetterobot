import React from "react";

const Well = ({ IsPipette, isfull }) => {
  var ImageAddress = IsPipette
    ? isfull
      ? "/Images/Lab/FullPipette.png"
      : "/Images/Lab/Pipette.png"
    : isfull
    ? "/Images/Lab/FullWell.jpg"
    : "/Images/Lab/Well.jpg";
  return (
    <div className="tc grow bg-white br3 pa2 ma2 dib bw2 shadow-5 dib">
      <img alt="Well" src={process.env.PUBLIC_URL + ImageAddress} />
    </div>
  );
};

export default Well;
