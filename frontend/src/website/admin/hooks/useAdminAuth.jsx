import React, { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('website_admin_user');
      return saved ? JSON.parse(saved) : null; // null = not logged in
    } catch (e) {
      return null;
    }
  });

  const loginAdmin = (userData) => {
    setAdminUser(userData);
    localStorage.setItem('website_admin_user', JSON.stringify(userData));
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('website_admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, loginAdmin, logoutAdmin, isAuthenticated: !!adminUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    // Context not available — treat as NOT authenticated (safe default)
    return {
      adminUser: null,
      loginAdmin: () => {},
      logoutAdmin: () => {},
      isAuthenticated: false
    };
  }
  return context;
};
