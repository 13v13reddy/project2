import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary-600">404</span>
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button 
              variant="primary" 
              leftIcon={<Home className="h-4 w-4" />}
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;