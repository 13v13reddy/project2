import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Home, Calendar, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockUsers, mockLocations } from '../../data/mockData';

interface PreRegisterFormValues {
  name: string;
  email: string;
  phone: string;
  company?: string;
  purpose: string;
  hostId: string;
  locationId: string;
  visitDate: string;
  visitTime: string;
  agreeToTerms: boolean;
}

const PreRegister = () => {
  const { token } = useParams<{ token: string }>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PreRegisterFormValues>({
    defaultValues: {
      // Add any pre-filled values based on token here
      hostId: token ? mockUsers[0].id : '',
      locationId: token ? mockLocations[0].id : '',
    }
  });
  
  const onSubmit = (data: PreRegisterFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  // Get tomorrow's date as the default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
          <Home className="h-8 w-8 text-primary-600" />
          <h1 className="ml-2 text-xl font-semibold text-gray-900">
            Enterprise Visitor Management
          </h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center p-6">
        <Card className="max-w-2xl w-full animate-fade-in">
          {!isSubmitted ? (
            <>
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Pre-Register Your Visit</h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
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
                  
                  <div className="md:col-span-2">
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
                  
                  <div className="md:col-span-2">
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
                  
                  <div>
                    <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700">
                      Visit Date <span className="text-error-500">*</span>
                    </label>
                    <input
                      id="visitDate"
                      type="date"
                      defaultValue={defaultDate}
                      className={`mt-1 block w-full rounded-md ${
                        errors.visitDate ? 'border-error-500' : 'border-gray-300'
                      } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                      {...register('visitDate', { required: 'Visit date is required' })}
                    />
                    {errors.visitDate && (
                      <p className="mt-1 text-sm text-error-500">{errors.visitDate.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="visitTime" className="block text-sm font-medium text-gray-700">
                      Visit Time <span className="text-error-500">*</span>
                    </label>
                    <input
                      id="visitTime"
                      type="time"
                      defaultValue="09:00"
                      className={`mt-1 block w-full rounded-md ${
                        errors.visitTime ? 'border-error-500' : 'border-gray-300'
                      } shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50`}
                      {...register('visitTime', { required: 'Visit time is required' })}
                    />
                    {errors.visitTime && (
                      <p className="mt-1 text-sm text-error-500">{errors.visitTime.message}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 flex items-start">
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
                        I agree to the <a href="#" className="text-primary-600">terms and conditions</a> and consent to the processing of my personal data
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-sm text-error-500">{errors.agreeToTerms.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                  >
                    Submit Pre-Registration
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-success-100 flex items-center justify-center">
                  <Check className="h-8 w-8 text-success-500" />
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Registration Successful!</h2>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                Your visit has been pre-registered. You will receive a confirmation email
                with a QR code that you can use for check-in.
              </p>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg text-left mx-auto max-w-md">
                <h3 className="font-medium text-gray-900">Visit Summary</h3>
                <dl className="mt-2 text-sm">
                  <div className="flex justify-between py-1">
                    <dt className="text-gray-500">Name:</dt>
                    <dd className="text-gray-900 font-medium">John Smith</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-gray-500">Host:</dt>
                    <dd className="text-gray-900">{mockUsers[0].name}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-gray-500">Location:</dt>
                    <dd className="text-gray-900">{mockLocations[0].name}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-gray-500">Date & Time:</dt>
                    <dd className="text-gray-900">{defaultDate} at 09:00 AM</dd>
                  </div>
                </dl>
              </div>
              
              <p className="mt-6 text-sm text-gray-500">
                Please arrive 10 minutes before your scheduled time and bring a valid ID.
              </p>
            </div>
          )}
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500">
        <p>© 2025 Enterprise Visitor Management System</p>
      </footer>
    </div>
  );
};

export default PreRegister;