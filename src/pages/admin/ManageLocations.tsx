import React, { useState, useEffect, useMemo } from 'react';
import { MailPlus, Search, Edit, Trash2, CheckCircle, XCircle, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Location } from '../../types'; // Ensure this type is correctly defined
import { mockLocations } from '../../data/mockData'; // Using mock data
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Define the shape of the form values for adding/editing a location
interface LocationFormValues {
  id?: string; // Optional for new locations
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  capacity: number | string; // Can be string from input, convert to number
  active: boolean;
}

const ManageLocations: React.FC = () => {
  // Component State
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [currentLocationForm, setCurrentLocationForm] = useState<LocationFormValues>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA', // Default country
    capacity: '',
    active: true,
  });

  // Fetch initial locations data
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setLocations(mockLocations);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setIsLoading(false);
        // Handle error state in UI if necessary
      }
    };

    fetchLocations();
  }, []);

  // Memoized filtered locations based on search query and status filter
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        location.name.toLowerCase().includes(searchLower) ||
        location.address.toLowerCase().includes(searchLower) ||
        location.city.toLowerCase().includes(searchLower) ||
        location.state.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && location.active) ||
        (statusFilter === 'inactive' && !location.active);

      return matchesSearch && matchesStatus;
    });
  }, [locations, searchQuery, statusFilter]);

  // Modal and Form Handling
  const openAddModal = () => {
    setEditingLocation(null);
    setCurrentLocationForm({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      capacity: '',
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (location: Location) => {
    setEditingLocation(location);
    setCurrentLocationForm({
      ...location,
      capacity: location.capacity.toString(), // Convert capacity to string for form input
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLocation(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setCurrentLocationForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setCurrentLocationForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const capacityNumber = parseInt(currentLocationForm.capacity as string, 10);
    if (isNaN(capacityNumber)) {
        alert('Capacity must be a valid number.');
        return;
    }

    const locationData: Location = {
      id: editingLocation?.id || Date.now().toString(), // Generate new ID if not editing
      name: currentLocationForm.name,
      address: currentLocationForm.address,
      city: currentLocationForm.city,
      state: currentLocationForm.state,
      zipCode: currentLocationForm.zipCode,
      country: currentLocationForm.country,
      capacity: capacityNumber,
      active: currentLocationForm.active,
      // createdAt and updatedAt would be handled by a real backend
    };

    if (editingLocation) {
      // Update existing location
      setLocations(locations.map(loc => loc.id === editingLocation.id ? { ...loc, ...locationData } : loc));
    } else {
      // Add new location
      setLocations([...locations, locationData]);
    }
    closeModal();
  };

  // Delete Location
  const handleDeleteLocation = (locationId: string) => {
    if (window.confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
      setLocations(locations.filter(location => location.id !== locationId));
      // In a real app, you would also make an API call here
    }
  };

  // Render Loading Spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Main component render
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Locations</h1>
        <Button
          variant="primary"
          leftIcon={<MailPlus className="h-4 w-4" />}
          onClick={openAddModal}
        >
          Add New Location
        </Button>
      </div>

      {/* Locations Table Card */}
      <Card>
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search locations by name, address, city..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        {/* Locations Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-5">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.capacity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        location.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {location.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(location)} className="text-primary-600 hover:text-primary-900">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteLocation(location.id)} className="text-red-600 hover:text-red-900 ml-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">
                    No locations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Optional - for future implementation) */}
        {/* <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-700">Showing 1 to 10 of 20 results</p>
          <div>
            <Button variant="outline">Previous</Button>
            <Button variant="outline" className="ml-2">Next</Button>
          </div>
        </div> */}
      </Card>

      {/* Add/Edit Location Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all animate-scale-in">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {editingLocation ? 'Edit Location' : 'Add New Location'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6 px-6 pb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Location Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={currentLocationForm.name}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={currentLocationForm.address}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={currentLocationForm.city}
                    onChange={handleFormChange}
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={currentLocationForm.state}
                    onChange={handleFormChange}
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={currentLocationForm.zipCode}
                    onChange={handleFormChange}
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    value={currentLocationForm.country}
                    onChange={handleFormChange}
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Capacity (Number of Visitors)
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  min="0"
                  value={currentLocationForm.capacity}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="active"
                  name="active"
                  type="checkbox"
                  checked={currentLocationForm.active}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                  Active Location
                </label>
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-2">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" leftIcon={editingLocation ? <CheckCircle className="h-4 w-4"/> : <MailPlus className="h-4 w-4"/>}>
                  {editingLocation ? 'Save Changes' : 'Add Location'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLocations;
