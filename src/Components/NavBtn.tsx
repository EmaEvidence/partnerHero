import React from 'react';
import NextIcon from '../assets/next.png';

const NavBtn: React.FC<{btnType: string, handleClick: Function}> = ({btnType, handleClick}) => {
  return (
    <button className="nav-btn" onClick={() => handleClick(btnType)}>
      <img src={NextIcon} className={`${btnType}-btn nav-btn-img`} alt={`${btnType} button`} />
    </button>
  );
}

export default NavBtn;
