import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  MapPin, 
  Settings, 
  X, 
  Home, 
  Bell,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const Sidebar = ({ isMobile, isOpen, onClose, userRole }: SidebarProps) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'host', 'security'] },
    { name: 'Visitor Logs', href: '/visitors', icon: ClipboardList, roles: ['admin', 'host', 'security'] },
    { name: 'Host Panel', href: '/host', icon: UserCheck, roles: ['admin', 'host'] },
    // Admin only items
    { name: 'Manage Users', href: '/admin/users', icon: Users, roles: ['admin'] },
    { name: 'Locations', href: '/admin/locations', icon: MapPin, roles: ['admin'] },
    // Common items at the bottom
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin', 'host', 'security'] },
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole));

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary-600">
        <div className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-white" />
          <span className="text-white font-semibold text-lg">Visitor MS</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-700 text-white' 
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`
              }
            >
              <item.icon 
                className="mr-3 flex-shrink-0 h-5 w-5"
                aria-hidden="true" 
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile version
  if (isMobile) {
    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              {sidebarContent}
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  // Desktop version
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          {sidebarContent}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;