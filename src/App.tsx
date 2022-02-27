import * as React from 'react';
import AuthProvider from './auth/auth';
import ProtectedPage from './pages/ProtectedPage';
import PublicPage from './pages/PublicPage';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import Layout from './components/layout';
import RequireAuth from './auth/requireAuth';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import { createHashHistory } from 'history';

export default function App() {
  const history = createHashHistory();
  return (
    <HashRouter basename='/'>
      <AuthProvider>
        <Routes>
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
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
