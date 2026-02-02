import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_BACKEND_URL || '';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const sendOTP = (phone: string, name: string) => 
  api.post('/auth/send-otp', { phone, name });

export const verifyOTP = (phone: string, otp: string) => 
  api.post('/auth/verify-otp', { phone, otp });

export const skipAuth = () => 
  api.post('/auth/skip');

// Assessment APIs
export const createAssessment = (data: any) => 
  api.post('/assessments', data);

export const getAssessment = (userId: string) => 
  api.get(`/assessments/${userId}`);

// Career APIs
export const generateCareerRecommendations = (assessmentId: string, userId: string) => 
  api.post(`/career-recommendations?assessment_id=${assessmentId}&user_id=${userId}`);

export const getCareerRecommendations = (userId: string) => 
  api.get(`/career-recommendations/${userId}`);

// Booking APIs
export const createBooking = (data: any) => 
  api.post('/bookings', data);

export const getBookings = (userId: string) => 
  api.get(`/bookings/${userId}`);

// Membership APIs
export const createMembership = (data: any) => 
  api.post('/memberships', data);

export const getMembership = (userId: string) => 
  api.get(`/memberships/${userId}`);
