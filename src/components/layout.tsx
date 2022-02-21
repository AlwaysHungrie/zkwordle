import React from 'react';
import {
  Outlet, Link
} from 'react-router-dom'
import AuthStatus from './authStatus';

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/game">Game Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Layout;