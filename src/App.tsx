import * as React from 'react';
import AuthProvider from './auth/auth';
import ProtectedPage from './pages/ProtectedPage';
import PublicPage from './pages/PublicPage';
import { Switch, Link, Route, HashRouter } from 'react-router-dom';
import Layout from './components/layout';
import RequireAuth from './auth/requireAuth';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import { createHashHistory } from 'history';
import AuthStatus from './components/authStatus';

export default function App() {
  const history = createHashHistory();
  return (
    <AuthProvider>
      <HashRouter>
        {/* <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
            />
            <Route
              path="/game"
              element={
                <RequireAuth>
                  <GamePage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes> */}
        <div>
          <AuthStatus />

          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
            <li>
              <Link to="/game">Game Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <RequireAuth path="/protected">
              <ProtectedPage />
            </RequireAuth>
            <RequireAuth path="/game">
              <GamePage />
            </RequireAuth>
          </Switch>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
