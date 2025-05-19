import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import PublicLayout from './components/layout/PublicLayout';
import LoginPage from './pages/auth/LoginPage';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy loaded components
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const VisitorLogs = lazy(() => import('./pages/visitors/VisitorLogs'));
const CheckInKiosk = lazy(() => import('./pages/kiosk/CheckInKiosk'));
const PreRegister = lazy(() => import('./pages/visitors/PreRegister'));
const HostDashboard = lazy(() => import('./pages/host/HostDashboard'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const ManageLocations = lazy(() => import('./pages/admin/ManageLocations'));
const Settings = lazy(() => import('./pages/settings/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/kiosk" element={<CheckInKiosk />} />
          <Route path="/pre-register/:token" element={<PreRegister />} />
        </Route>

        {/* Protected routes */}
        <Route 
          element={
            user ? <Layout /> : <Navigate to="/login" />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/visitors" element={<VisitorLogs />} />
          <Route path="/host" element={<HostDashboard />} />
          
          {/* Admin routes */}
          {user?.role === 'admin' && (
            <>
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/locations" element={<ManageLocations />} />
            </>
          )}
          
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;