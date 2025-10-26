import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CitizenDashboard from './pages/CitizenDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import SystemSettings from './pages/SystemSettings';
import DatabaseManagement from './pages/DatabaseManagement';
import SecurityManagement from './pages/SecurityManagement';
import AlertManagement from './pages/AlertManagement';
import EmergencyTools from './pages/EmergencyTools';
import AIAssistantPage from './pages/AIAssistant';
import SettingsPage from './pages/Settings';

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
                    <AuthorityDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/authority/reports" 
                element={
                  <ProtectedRoute requiredRole="authority">
                    <AuthorityDashboard />
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
              
              {/* Settings - Accessible to all authenticated users */}
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
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