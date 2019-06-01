import * as React from 'react';

import HeaderView from './header-view';

const HeaderWrapper = () => {
  const handleNavigation = () => {
    setIsOpen(false);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return <HeaderView handleNavigation={handleNavigation} handleToggleMenu={handleToggleMenu} isOpen={isOpen} />;
};

export default HeaderWrapper;
