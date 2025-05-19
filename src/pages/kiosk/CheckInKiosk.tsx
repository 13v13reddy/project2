import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Home, UserCheck, Camera, ArrowRight, QrCode } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockUsers, mockLocations } from '../../data/mockData';

interface KioskFormValues {
  name: string;
  email: string;
  phone: string;
  company?: string;
  purpose: string;
  hostId: string;
  locationId: string;
  agreeToTerms: boolean;
}

enum KioskStep {
  WELCOME = 'welcome',
  QR_SCAN = 'qr_scan',
  FORM = 'form',
  PHOTO = 'photo',
  CONFIRMATION = 'confirmation',
}

const CheckInKiosk = () => {
  const [currentStep, setCurrentStep] = useState<KioskStep>(KioskStep.WELCOME);
  const [formData, setFormData] = useState<KioskFormValues | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<KioskFormValues>();
  
  const onSubmit = (data: KioskFormValues) => {
    setFormData(data);
    setCurrentStep(KioskStep.PHOTO);
  };
  
  const handleCaptureDone = () => {
    // Simulate capturing photo
    setTimeout(() => {
      setCurrentStep(KioskStep.CONFIRMATION);
    }, 1000);
  };
  
  const handleCompletedCheckIn = () => {
    // Reset form and go back to welcome screen
    setFormData(null);
    setCurrentStep(KioskStep.WELCOME);
  };
  
  // Function to render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case KioskStep.WELCOME:
        return (
          <div className="text-center animate-fade-in">
            <div className="flex justify-center">
              <Home className="h-20 w-20 text-primary-600" />
            </div>
            <h1 className="mt-6 text-4xl font-bold text-gray-900">Welcome to Our Office</h1>
            <p className="mt-4 text-lg text-gray-600">Please check in using one of the options below</p>
            
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                leftIcon={<QrCode className="h-5 w-5" />}
                onClick={() => setCurrentStep(KioskStep.QR_SCAN)}
              >
                Scan QR Code
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                leftIcon={<ArrowRight className="h-5 w-5" />}
                onClick={() => setCurrentStep(KioskStep.FORM)}
              >
                Manual Check-In
              </Button>
            </div>
          </div>
        );
        
      case KioskStep.QR_SCAN:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900">Scan Your QR Code</h2>
            <p className="mt-4 text-gray-600">Position your pre-registration QR code in front of the camera</p>
            
            <div className="mt-8 mb-8 mx-auto w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <QrCode className="h-20 w-20 text-gray-400" />
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(KioskStep.WELCOME)}
              >
                Back
              </Button>
              <Button 
                variant="primary"
                onClick={() => setCurrentStep(KioskStep.FORM)}
              >
                Can't scan? Enter manually
              </Button>
            </div>
          </div>
        );
        
      case KioskStep.FORM:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Check-In Information</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`mt-1 block w-full rounded-md ${
                      errors.name ? 'border-error-500' : 'border-gray-300'
                    } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`mt-1 block w-full rounded-md ${
                      errors.email ? 'border-error-500' : 'border-gray-300'
                    } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`mt-1 block w-full rounded-md ${
                      errors.phone ? 'border-error-500' : 'border-gray-300'
                    } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-error-500">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    {...register('company')}
                  />
                </div>
                
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                    Purpose of Visit <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="purpose"
                    type="text"
                    className={`mt-1 block w-full rounded-md ${
                      errors.purpose ? 'border-error-500' : 'border-gray-300'
                    } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                    {...register('purpose', { required: 'Purpose is required' })}
                  />
                  {errors.purpose && (
                    <p className="mt-1 text-sm text-error-500">{errors.purpose.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="hostId" className="block text-sm font-medium text-gray-700">
                    Person You're Visiting <span className="text-error-500">*</span>
                  </label>
                  <select
                    id="hostId"
                    className={`mt-1 block w-full rounded-md ${
                      errors.hostId ? 'border-error-500' : 'border-gray-300'
                    } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                    {...register('hostId', { required: 'Host is required' })}
                  >
                    <option value="">Select a host...</option>
                    {mockUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} {user.department ? `(${user.department})` : ''}
                      </option>
                    ))}
                  </select>
                  {errors.hostId && (
                    <p className="mt-1 text-sm text-error-500">{errors.hostId.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="locationId" className="block text-sm font-medium text-gray-700">
                    Location <span className="text-error-500">*</span>
                  </label>
                  <select
                    id="locationId"
                    className={`mt-1 block w-full rounded-md ${
                      errors.locationId ? 'border-error-500' : 'border-gray-300'
                    } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                    {...register('locationId', { required: 'Location is required' })}
                  >
                    <option value="">Select a location...</option>
                    {mockLocations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name} ({location.city}, {location.state})
                      </option>
                    ))}
                  </select>
                  {errors.locationId && (
                    <p className="mt-1 text-sm text-error-500">{errors.locationId.message}</p>
                  )}
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      className={`focus:ring-primary-500 h-4 w-4 text-primary-600 border ${
                        errors.agreeToTerms ? 'border-error-500' : 'border-gray-300'
                      } rounded`}
                      {...register('agreeToTerms', { 
                        required: 'You must agree to the terms and conditions' 
                      })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                      I agree to the <a href="#" className="text-primary-600">terms and conditions</a>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-error-500">{errors.agreeToTerms.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(KioskStep.WELCOME)}
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  variant="primary"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        );
        
      case KioskStep.PHOTO:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">Take a Photo</h2>
            <p className="mt-2 text-gray-600">Please look at the camera and take a photo for your visitor badge</p>
            
            <div className="mt-8 mb-8 mx-auto w-64 h-64 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <Camera className="h-20 w-20 text-gray-400" />
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(KioskStep.FORM)}
              >
                Back
              </Button>
              <Button 
                variant="primary"
                leftIcon={<Camera className="h-4 w-4" />}
                onClick={handleCaptureDone}
              >
                Take Photo
              </Button>
            </div>
          </div>
        );
        
      case KioskStep.CONFIRMATION:
        return (
          <div className="text-center animate-fade-in">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-success-100 flex items-center justify-center">
                <UserCheck className="h-10 w-10 text-success-500" />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Check-In Complete!</h2>
            <p className="mt-2 text-lg text-gray-600">
              Welcome, {formData?.name}
            </p>
            
            <Card className="mt-8 text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Visit Details</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Host:</dt>
                  <dd className="text-sm text-gray-900">
                    {mockUsers.find(user => user.id === formData?.hostId)?.name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Location:</dt>
                  <dd className="text-sm text-gray-900">
                    {mockLocations.find(loc => loc.id === formData?.locationId)?.name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Purpose:</dt>
                  <dd className="text-sm text-gray-900">{formData?.purpose}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Check-In Time:</dt>
                  <dd className="text-sm text-gray-900">{new Date().toLocaleTimeString()}</dd>
                </div>
              </dl>
            </Card>
            
            <div className="mt-8">
              <p className="text-gray-600 mb-4">Your host has been notified of your arrival.</p>
              
              <Button 
                variant="primary"
                onClick={handleCompletedCheckIn}
              >
                Done
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-primary-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              Enterprise Visitor Management
            </h1>
          </div>
          <div className="text-lg text-gray-500">
            {new Date().toLocaleDateString()} | <span id="clock">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white rounded-xl shadow-card max-w-2xl w-full p-8">
          {renderStep()}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500">
        <p>© 2025 Enterprise Visitor Management System</p>
      </footer>
    </div>
  );
};

export default CheckInKiosk;