import React from 'react';
import Navigation from './navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const BaseAdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Navigation />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default BaseAdminLayout;