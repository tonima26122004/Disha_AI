import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('citizen');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved preferences
    const savedRole = localStorage.getItem('disha-role');
    const savedLang = localStorage.getItem('disha-language');
    
    if (savedRole) setCurrentRole(savedRole);
    if (savedLang) setLanguage(savedLang);
  }, []);

  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    localStorage.setItem('disha-role', newRole);
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('disha-language', newLang);
  };

  const getRoleInfo = () => {
    const roles = {
      citizen: {
        name: 'Citizen/Tourist',
        dashboard: '/citizen',
        color: 'blue',
        icon: '👤'
      },
      authority: {
        name: 'Authority/Rescue Team',
        dashboard: '/authority',
        color: 'red',
        icon: '🛡️'
      },
      admin: {
        name: 'Admin',
        dashboard: '/admin',
        color: 'purple',
        icon: '⚙️'
      }
    };
    return roles[currentRole] || roles.citizen;
  };

  const value = {
    currentRole,
    language,
    switchRole,
    changeLanguage,
    getRoleInfo
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};
