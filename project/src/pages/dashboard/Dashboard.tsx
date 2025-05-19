import { useState, useEffect } from 'react';
import { BarChart, PieChart, ActivitySquare, Calendar, ChevronRight, UserCheck, UserX, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { DashboardStats } from '../../types';
import { mockDashboardStats } from '../../data/mockData';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // await api.get('/dashboard/stats')
        
        // For demo purposes, use mock data
        setTimeout(() => {
          setStats(mockDashboardStats);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!stats) {
    return <div>Failed to load dashboard data</div>;
  }

  const visitorsByHourData = {
    labels: stats.visitorsByHour.map(item => `${item.hour}:00`),
    datasets: [
      {
        label: 'Visitors by Hour',
        data: stats.visitorsByHour.map(item => item.count),
        backgroundColor: '#3366FF',
        borderColor: '#1E3A8A',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" leftIcon={<Calendar className="h-4 w-4" />}>
            Today
          </Button>
          <Button variant="primary" leftIcon={<Users className="h-4 w-4" />}>
            Register New Visitor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Visitors</p>
              <p className="text-3xl font-bold text-gray-900">{stats.todayVisitors}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-success-700 font-medium flex items-center">
              +5% <ChevronRight className="h-4 w-4" />
            </span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </Card>

        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Expected Today</p>
              <p className="text-3xl font-bold text-gray-900">{stats.expectedVisitors}</p>
            </div>
            <div className="p-3 bg-secondary-100 rounded-full">
              <Calendar className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-success-700 font-medium flex items-center">
              +12% <ChevronRight className="h-4 w-4" />
            </span>
            <span className="text-gray-500 ml-1">from last week</span>
          </div>
        </Card>

        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Currently Checked In</p>
              <p className="text-3xl font-bold text-gray-900">{stats.checkedIn}</p>
            </div>
            <div className="p-3 bg-accent-100 rounded-full">
              <UserCheck className="h-6 w-6 text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Active on premises</span>
          </div>
        </Card>

        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Checked Out</p>
              <p className="text-3xl font-bold text-gray-900">{stats.checkedOut}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <UserX className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Completed visits today</span>
          </div>
        </Card>
      </div>

      {/* Charts & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Visitor Traffic Today" icon={<BarChart className="h-5 w-5" />}>
          <div className="h-64">
            <Bar data={visitorsByHourData} options={chartOptions} />
          </div>
        </Card>

        <Card title="Top Locations" subtitle="Visit distribution" icon={<PieChart className="h-5 w-5" />}>
          <div className="space-y-4">
            {stats.visitorsByLocation.map((location) => (
              <div key={location.locationId} className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{location.locationName}</span>
                    <span className="text-sm font-medium text-gray-900">{location.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(location.count / stats.todayVisitors) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" icon={<ActivitySquare className="h-5 w-5" />}>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-primary-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">John Smith checked in</p>
              <p className="text-xs text-gray-500">5 minutes ago • Meeting with Sarah Johnson</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-accent-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-accent-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">New visitor pre-registered</p>
              <p className="text-xs text-gray-500">15 minutes ago • Alice Brown for tomorrow at 10:00 AM</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <UserX className="h-4 w-4 text-gray-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Michael Davis checked out</p>
              <p className="text-xs text-gray-500">32 minutes ago • Interview with HR</p>
            </div>
          </div>
          
          <Button variant="outline" fullWidth>
            View All Activity
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;