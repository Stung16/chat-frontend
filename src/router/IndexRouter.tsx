import Login from '@/App/pages/auth/Login';
import SignUpPage from '@/App/pages/auth/Signup';
import Home from '@/App/pages/home/Home';
import ProfilePage from '@/App/pages/profile/Profile';
import SettingsPage from '@/App/pages/setting/Setting';
import Navbar from '@/components/Sidebar/Navbar';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
export default function IndexRouter() {
  const { checkAuth, authUser } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={authUser ? <Home /> : <Navigate to='/auth/login' />}
        />
        <Route
          path='/auth/signup'
          element={!authUser ? <SignUpPage /> : <Navigate to='/' />}
        />
        <Route
          path='/auth/login'
          element={!authUser ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/settings'
          element={<SettingsPage />}
        />
        <Route
          path='/profile'
          element={authUser ? <ProfilePage /> : <Navigate to='/login' />}
        />
      </Routes>
    </main>
  );
}
