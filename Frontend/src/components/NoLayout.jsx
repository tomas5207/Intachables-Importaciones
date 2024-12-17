// NoLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const NoLayout = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Outlet />
    </div>
  );
};

export default NoLayout;
