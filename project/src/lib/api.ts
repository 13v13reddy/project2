import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // User Management
  async createUser(userData: any) {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  },

  async updateUser(id: string, userData: any) {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return response.data;
  },

  async getAllUsers() {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  // Location Management
  async createLocation(locationData: any) {
    const response = await axios.post(`${API_BASE_URL}/locations`, locationData);
    return response.data;
  },

  async updateLocation(id: string, locationData: any) {
    const response = await axios.put(`${API_BASE_URL}/locations/${id}`, locationData);
    return response.data;
  },

  async getAllLocations() {
    const response = await axios.get(`${API_BASE_URL}/locations`);
    return response.data;
  },

  // Visitor Management
  async createVisitor(visitorData: any) {
    const response = await axios.post(`${API_BASE_URL}/visitors`, visitorData);
    return response.data;
  },

  async createVisitorLog(logData: any) {
    const response = await axios.post(`${API_BASE_URL}/visitor-logs`, logData);
    return response.data;
  },

  async getVisitorLogs() {
    const response = await axios.get(`${API_BASE_URL}/visitor-logs`);
    return response.data;
  },

  async checkInVisitor(visitorId: string, locationId: string, hostId: string) {
    const response = await axios.post(`${API_BASE_URL}/visitor-logs/${visitorId}/check-in`, {
      locationId,
      hostId
    });
    return response.data;
  },

  async checkOutVisitor(visitorId: string) {
    const response = await axios.post(`${API_BASE_URL}/visitor-logs/${visitorId}/check-out`);
    return response.data;
  },

  // Authentication
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  }
};