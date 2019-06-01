import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SidebarView from './sidebar-view';

interface IOwnProps {
  children: React.ReactNode;
  isRight?: boolean;
  title: string;
}

const SidebarWrapper = ({ children, isRight, title }: IOwnProps) => {
  const sidebarMountPoint = document.getElementById('sidebar-mount-point');
  if (!sidebarMountPoint) {
    return null;
  }

  const div = document.createElement('div');
  const mountSidebarEffect = () => {
    if (sidebarMountPoint) {
      sidebarMountPoint.appendChild(div);

      return () => {
        sidebarMountPoint.removeChild(div);
      };
    }
  };
  React.useEffect(mountSidebarEffect, [title]);

  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return ReactDOM.createPortal(
    <SidebarView handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} isRight={isRight} title={title}>
      {children}
    </SidebarView>,
    sidebarMountPoint
  );
};

export default SidebarWrapper;
