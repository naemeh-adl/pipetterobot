import React from 'react';

const PlaceBox = ({ placefield, placeChange, ax }) => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue w-20'
        type='number'
         min="1"
         max="5"
        // step="1"
        placeholder={"P"+ ax}
       onChange={placeChange}
      />
    </div>
  );
}

export default PlaceBox;