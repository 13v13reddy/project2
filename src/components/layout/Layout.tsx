import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

const Layout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <Sidebar 
        isMobile={true} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userRole={user?.role || 'host'} 
      />
      
      {/* Desktop sidebar */}
      <Sidebar 
        isMobile={false} 
        isOpen={true} 
        onClose={() => {}} 
        userRole={user?.role || 'host'} 
      />
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          userName={user?.name || ''}
          userRole={user?.role || 'host'}
          userAvatar={user?.avatar}
        />
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;