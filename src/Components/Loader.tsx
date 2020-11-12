import React from 'react';
import LoaderImage from '../assets/loader.gif';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="underlay"></div>
      <img src={LoaderImage} alt="Loading" />
    </div>
  );
}

export default Loader;
