// Use absolute URLs in production, relative URLs in development
const isProduction = window.location.hostname !== 'localhost';
const API_BASE = isProduction ? 'https://job-portal-beta-one.vercel.app' : '';

export const JOB_API_END_POINT = `${API_BASE}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/application`;
export const USER_API_END_POINT = `${API_BASE}/user`;
export const COMPANY_API_END_POINT = `${API_BASE}/company`;