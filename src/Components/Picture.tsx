import React from 'react';

const Picture: React.FC<{image: string, title: string}> = ({image, title}) => {
  return (
    <div className="picture" style={{
      backgroundImage: `url(${image})`
    }}>
    </div>
  );
}

export default Picture;
