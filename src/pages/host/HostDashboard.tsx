import { useState, useEffect } from 'react';
import { Bell, Calendar, CheckCircle, Clock, Users, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { mockVisitorLogs } from '../../data/mockData';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const HostDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter logs for the current host
  const hostVisitorLogs = mockVisitorLogs.filter(log => log.hostId === user?.id);

  // Split logs into upcoming and past visits
  const now = new Date();
  const upcomingVisits = hostVisitorLogs.filter(
    log => new Date(log.checkInTime) > now
  );
  const pastVisits = hostVisitorLogs.filter(
    log => new Date(log.checkInTime) <= now
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
        <Button
          variant="primary"
          leftIcon={<Users className="h-4 w-4" />}
        >
          Pre-register Visitor
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Visitors</p>
              <p className="text-3xl font-bold text-gray-900">
                {hostVisitorLogs.filter(log => 
                  new Date(log.checkInTime).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Visits</p>
              <p className="text-3xl font-bold text-gray-900">{upcomingVisits.length}</p>
            </div>
            <div className="p-3 bg-accent-100 rounded-full">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </Card>

        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Currently Checked In</p>
              <p className="text-3xl font-bold text-gray-900">
                {hostVisitorLogs.filter(log => log.status === 'checked_in').length}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-success-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Visitor List */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Visits
            </button>
            <button
              className={`${
                activeTab === 'past'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('past')}
            >
              Past Visits
            </button>
          </nav>
        </div>

        <div className="divide-y divide-gray-200">
          {(activeTab === 'upcoming' ? upcomingVisits : pastVisits).map((visit) => (
            <div key={visit.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                      {visit.visitor.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{visit.visitor.name}</h3>
                    <div className="text-sm text-gray-500">{visit.visitor.company}</div>
                    <div className="text-sm text-gray-500">{visit.visitor.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {format(new Date(visit.checkInTime), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  <div className="mt-1">
                    {visit.status === 'checked_in' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                        Checked In
                      </span>
                    )}
                    {visit.status === 'checked_out' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Checked Out
                      </span>
                    )}
                    {visit.status === 'expected' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Expected
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {activeTab === 'upcoming' && (
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<XCircle className="h-4 w-4" />}
                  >
                    Cancel Visit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Bell className="h-4 w-4" />}
                  >
                    Send Reminder
                  </Button>
                </div>
              )}
            </div>
          ))}

          {(activeTab === 'upcoming' ? upcomingVisits : pastVisits).length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No {activeTab === 'upcoming' ? 'upcoming' : 'past'} visits found
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HostDashboard;