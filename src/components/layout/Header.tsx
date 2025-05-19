import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Bell, ChevronDown, LogOut, Menu as MenuIcon, Settings, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  userName: string;
  userRole: string;
  userAvatar?: string;
}

const Header = ({ onMenuClick, userName, userRole, userAvatar }: HeaderProps) => {
  const { logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
              onClick={onMenuClick}
            >
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-xl font-semibold text-gray-900">
                Enterprise Visitor Management System
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/kiosk"
              target="_blank"
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-1 rounded-md text-sm mr-4 hidden md:block transition-colors duration-150 ease-in-out"
            >
              Open Kiosk Mode
            </Link>
            
            {/* Notification bell */}
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-4"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <span className="sr-only">Open user menu</span>
                  {userAvatar ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userAvatar}
                      alt={userName}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="ml-2 hidden md:block">{userName}</span>
                  <span className="ml-1 text-xs text-gray-500 hidden md:block capitalize">
                    ({userRole})
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-dropdown bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <User className="mr-3 h-4 w-4 text-gray-500" aria-hidden="true" />
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <Settings className="mr-3 h-4 w-4 text-gray-500" aria-hidden="true" />
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                        >
                          <LogOut className="mr-3 h-4 w-4 text-gray-500" aria-hidden="true" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;