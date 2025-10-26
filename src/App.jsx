import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider, useRole } from './context/RoleContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import AuthorityDashboard from './pages/authority/AuthorityDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';
import DatabaseManagement from './pages/admin/DatabaseManagement';
import SecurityManagement from './pages/admin/SecurityManagement';
import AlertManagement from './pages/authority/AlertManagement';
import RescueCoordination from './pages/authority/RescueCoordination';
import ReportsAnalytics from './pages/authority/ReportsAnalytics';
import EmergencyTools from './pages/citizen/EmergencyTools';
import AIAssistantPage from './pages/citizen/AIAssistant';
import CitizenSettings from './pages/citizen/CitizenSettings';
import AuthoritySettings from './pages/authority/AuthoritySettings';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route 
                path="/citizen" 
                element={
                  <ProtectedRoute requiredRole="citizen">
                    <CitizenDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/authority" 
                element={
                  <ProtectedRoute requiredRole="authority">
                    <AuthorityDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/authority/alerts" 
                element={
                  <ProtectedRoute requiredRole="authority">
                    <AlertManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/authority/rescue" 
                element={
                  <ProtectedRoute requiredRole="authority">
                    <RescueCoordination />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/authority/reports" 
                element={
                  <ProtectedRoute requiredRole="authority">
                    <ReportsAnalytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <SystemSettings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/database" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <DatabaseManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/security" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <SecurityManagement />
                  </ProtectedRoute>
                } 
              />
              
              {/* Emergency Tools - Accessible to all authenticated users */}
              <Route 
                path="/emergency-tools" 
                element={
                  <ProtectedRoute>
                    <EmergencyTools />
                  </ProtectedRoute>
                } 
              />
              
              {/* AI Assistant - Accessible to all authenticated users */}
              <Route 
                path="/ai-assistant" 
                element={
                  <ProtectedRoute>
                    <AIAssistantPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Citizen Settings */}
              <Route 
                path="/citizen/settings" 
                element={
                  <ProtectedRoute requiredRole="citizen">
                    <CitizenSettings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Authority Settings */}
              <Route 
                path="/authority/settings" 
                element={
                  <ProtectedRoute requiredRole="authority">
                    <AuthoritySettings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Settings */}
              <Route 
                path="/admin/admin-settings" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminSettings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Legacy Settings Route - Redirect to role-specific settings */}
              <Route 
                path="/settings" 
                element={<Navigate to="/citizen/settings" replace />} 
              />
              
              {/* Redirects */}
              <Route path="/dashboard" element={<Navigate to="/citizen" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;