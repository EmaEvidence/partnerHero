import React from 'react';

const Description: React.FC<{description: string}> = ({description}) => {
  return (
    <p className="description">
      {description}
    </p> 
  );
}

export default Description;
