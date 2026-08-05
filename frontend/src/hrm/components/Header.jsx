import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { useTheme } from '../../shared/context/ThemeContext';
import api from '../../services/api';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownActive, setDropdownActive] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) return null;

  const getDashboardTitle = () => {
    switch (user.role) {
      case 'MD':
        return 'Managing Director Dashboard';
      case 'HR':
        return 'HR Dashboard';
      case 'Manager':
        return 'Manager Dashboard';
      case 'TeamLead':
        return 'Team Lead Dashboard';
      default:
        return 'Employee Dashboard';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'YG';
    return name.slice(0, 2).toUpperCase();
  };

  const API_BASE = (import.meta.env.VITE_API_URL || api.defaults.baseURL || 'http://127.0.0.1:8000').replace(/\/$/, '');

  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <div className="logo-card">
            <img 
              src="/logo.png" 
              alt="YGR TEAM Logo" 
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain'
              }} 
              onError={(e) => {
                e.target.style.display = 'none'; // hide broken image if missing
              }}
            />
            <span className="logo-company-name">YGR TEAM</span>
          </div>
        </Link>
      </div>

      <div className="header-center">
        <h1 className="header-title">{getDashboardTitle()}</h1>
      </div>

      <div className="header-right">
        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme} 
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '15px',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(100, 116, 139, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} style={{ color: theme === 'dark' ? '#fbbf24' : '#64748b' }}></i>
        </button>

        {/* Profile Dropdown Widget */}
        <div className="profile-dropdown-container">
          <div className="hr-profile" onClick={() => setDropdownActive(!dropdownActive)}>
            <div className="avatar-container">
              {user.profile_pic ? (
                <img 
                  src={user.profile_pic.startsWith('http') ? user.profile_pic : `${API_BASE}${user.profile_pic}`} 
                  className="user-profile-img" 
                  alt={user.username} 
                />
              ) : (
                <div className="initials-avatar">
                  {getInitials(user.first_name || user.username)}
                </div>
              )}
              <div className="online-indicator"></div>
            </div>
            <div className="hr-info">
              <span className="hr-name">{user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.usernamey}</span>
              <span className="role-badge-pill">{user.designation || user.role}</span>
            </div>
            <i className="fa-solid fa-chevron-down dropdown-arrow" style={{ transform: dropdownActive ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}></i>
          </div>

          <div className={`dropdown-menu ${dropdownActive ? 'active' : ''}`} style={{ display: dropdownActive ? 'flex' : 'none' }}>
            <Link to="/profile" onClick={() => setDropdownActive(false)}><i className="fa-solid fa-user"></i> My Profile</Link>
            <Link to="/attendance" onClick={() => setDropdownActive(false)}><i className="fa-solid fa-calendar-days"></i> My Attendance</Link>
            <Link to="/payslips" onClick={() => setDropdownActive(false)}><i className="fa-solid fa-file-invoice-dollar"></i> My Payslips</Link>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-logout" onClick={(e) => { e.preventDefault(); setDropdownActive(false); setShowLogoutConfirm(true); }}><i className="fa-solid fa-power-off"></i> Sign Out</a>
          </div>
        </div>

        {/* Quick Power Off button */}
        <a href="#" className="logout-btn" title="Logout" onClick={(e) => { e.preventDefault(); setShowLogoutConfirm(true); }}>
          <i className="fa-solid fa-power-off"></i>
        </a>
      </div>

      {showLogoutConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
          }}>
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px'
            }}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
              marginBottom: '8px',
              border: 'none',
              background: 'none'
            }}>Confirm Sign Out</h3>
            <p style={{ 
              color: theme === 'dark' ? '#94a3b8' : '#64748b', 
              fontSize: '0.95rem',
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>Are you sure you want to sign out? You will need to log in again to access your dashboard.</p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '6px',
                  border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
                  background: theme === 'dark' ? '#1e293b' : '#ffffff',
                  color: theme === 'dark' ? '#94a3b8' : '#475569',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  flex: 1,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#334155' : '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1e293b' : '#ffffff'}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  flex: 1,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
