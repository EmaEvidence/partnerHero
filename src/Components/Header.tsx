import React from 'react';

const Header: React.FC<{title: string}> = ({title}) => {
  return (
    <header className="App-header">
      <h3 className="App-link">
        {title}
      </h3>
    </header>
  );
}

export default Header;
