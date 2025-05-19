import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { User, Lock, Bell } from 'lucide-react';

// Define a type for the form values, if needed for more complex settings
interface SettingsFormValues {
  name: string;
  email: string;
  // Add other settings fields as necessary
}

const Settings: React.FC = () => {
  const { user, logout } = useAuth(); // Assuming logout is also needed here or in a sub-component

  // State for form values, if you have editable settings
  const [profileSettings, setProfileSettings] = useState<SettingsFormValues>({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Example setting

  if (!user) {
    return <div>Loading user data or user not found...</div>;
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update user profile
    console.log('Profile settings submitted:', profileSettings);
    alert('Profile updated successfully! (Simulated)');
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    // TODO: Implement API call to change password
    console.log('Password change submitted for user:', user.email);
    alert('Password changed successfully! (Simulated)');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your account settings and preferences.</p>
      </div>

      {/* Profile Settings Card */}
      <Card title="Profile Information" icon={<User className="h-5 w-5 text-primary-600" />}>
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={profileSettings.name}
              onChange={handleProfileChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={profileSettings.email}
              onChange={handleProfileChange}
              disabled // Email usually not editable directly or requires verification
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 cursor-not-allowed focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="text-right">
            <Button type="submit" variant="primary">
              Save Profile
            </Button>
          </div>
        </form>
      </Card>

      {/* Change Password Card */}
      <Card title="Change Password" icon={<Lock className="h-5 w-5 text-primary-600" />}>
        <form onSubmit={handlePasswordChangeSubmit} className="space-y-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
            />
          </div>
          <div className="text-right">
            <Button type="submit" variant="primary">
              Update Password
            </Button>
          </div>
        </form>
      </Card>

      {/* Notification Settings Card (Example) */}
      <Card title="Notification Preferences" icon={<Bell className="h-5 w-5 text-primary-600" />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col">
              <span className="text-sm font-medium text-gray-900">Email Notifications</span>
              <span className="text-sm text-gray-500">Receive email updates for visitor arrivals and system alerts.</span>
            </span>
            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`${
                notificationsEnabled ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              role="switch"
              aria-checked={notificationsEnabled}
            >
              <span
                aria-hidden="true"
                className={`${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
              />
            </button>
          </div>
          {/* Add more notification settings here */}
        </div>
         <div className="text-right mt-6">
            <Button variant="primary" onClick={() => alert('Notification settings saved! (Simulated)')}>
              Save Notification Preferences
            </Button>
          </div>
      </Card>

       {/* Logout Button */}
       <div className="pt-6 border-t border-gray-200">
        <Button
            variant="danger"
            onClick={() => {
                if(window.confirm('Are you sure you want to log out?')) {
                    logout();
                }
            }}
            fullWidth
        >
            Log Out
        </Button>
       </div>
    </div>
  );
};

export default Settings;
