import React from 'react';

const SetFavBtn: React.FC<{handleOnClick: Function}> = ({handleOnClick}) => {
  return (
    <button className="set-fav-btn" onClick={() => handleOnClick()}>
      Set Favourite
    </button>
  );
}

export default SetFavBtn;
