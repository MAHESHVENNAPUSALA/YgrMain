import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { attendanceApi } from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import { ROUTES } from '../../shared/constants/routes';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { showToast } = useToast();
  
  // Accordion menu open/close states
  const [menus, setMenus] = useState({
    createAccountMenu: false,
    memberListMenu: false,
    accountsMenu: false,
    hrMenu: false,
    attendanceMenu: false,
    financeMenu: false,
    websiteCmsMenu: false,
  });

  // Unread messages count badge
  const [msgUnreadCount, setMsgUnreadCount] = useState(() => {
    try { 
      const stored = localStorage.getItem('msg_unread_count');
      return stored ? parseInt(stored, 10) : 0;
    } catch { return 0; }
  });

  // Attendance state for current day
  const [attendance, setAttendance] = useState(null);
  const [loadingAttendance, setLoadingAttendance] = useState(true);

  // Attendance Modal States
  const [showModal, setShowModal] = useState(false);
  const [isCheckInMode, setIsCheckInMode] = useState(true);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [gpsLocation, setGpsLocation] = useState('');
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');
  const [isMocked, setIsMocked] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Fetch attendance status
  const fetchAttendanceStatus = async () => {
    try {
      const res = await attendanceApi.getStatus();
      setAttendance(res.data);
    } catch (err) {
      console.error('Error fetching attendance status:', err);
    } finally {
      setLoadingAttendance(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAttendanceStatus();
    }
  }, [user]);

  // Listen for unread message count updates from Messages page
  useEffect(() => {
    const handler = (e) => {
      const count = e.detail || 0;
      setMsgUnreadCount(count);
      localStorage.setItem('msg_unread_count', String(count));
    };
    window.addEventListener('msg-unread-update', handler);
    return () => window.removeEventListener('msg-unread-update', handler);
  }, []);

  // Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  if (!user) return null;

  const toggleMenu = (menuName) => {
    setMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const openAttendanceModal = (isCheckIn) => {
    setIsCheckInMode(isCheckIn);
    setShowModal(true);
    setCapturedPhoto(null);
    setGpsLocation('');
    setCoords({ latitude: null, longitude: null });
    setAddress('');
    setIsMocked(false);
    setGpsError(null);
    
    // Fetch location and start camera
    fetchGpsLocation();
    setTimeout(() => {
      startWebcam();
    }, 200);
  };

  const closeAttendanceModal = () => {
    stopWebcam();
    setShowModal(false);
    setCapturedPhoto(null);
    setGpsLocation('');
    setCoords({ latitude: null, longitude: null });
    setAddress('');
    setIsMocked(false);
    setGpsError(null);
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 360, facingMode: 'user' }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setGpsError("Could not access camera. Face photo/selfie is mandatory for attendance.");
    }
  };

  const stopWebcam = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      // Compress by setting standard downscaled dimensions (320x240)
      canvas.width = 320;
      canvas.height = 240;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Compress with 0.7 jpeg quality to reduce upload payload
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      setCapturedPhoto(dataUrl);
      stopWebcam();
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startWebcam();
  };

  const fetchGpsLocation = () => {
    setGpsLoading(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mocked = position.mocked || (position.coords && position.coords.mocked) || false;
        setIsMocked(mocked);
        setCoords({ latitude, longitude });
        setGpsLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        
        // Reverse Geocoding using Nominatim OpenStreetMap API
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
          headers: { 'Accept-Language': 'en' }
        })
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) {
              setAddress(data.display_name);
            } else {
              setAddress(`Coords: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
            }
          })
          .catch(err => {
            console.warn("Reverse geocode failed, using lat/lng", err);
            setAddress(`Coords: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          })
          .finally(() => {
            setGpsLoading(false);
          });
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errMsg = "Unable to retrieve location.";
        if (error.code === error.PERMISSION_DENIED) {
          errMsg = "GPS permission denied. Location is required by HR policy.";
        }
        setGpsError(errMsg);
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleCheckInSubmit = async () => {
    if (submitting) return;
    if (!capturedPhoto) {
      showToast("Check-in selfie is mandatory. Please capture your photo first.", "warning");
      return;
    }
    if (!coords.latitude || !coords.longitude) {
      showToast("GPS location coordinates are mandatory to mark attendance.", "error");
      return;
    }
    if (isMocked) {
      showToast("Fake/Mock GPS location detected! Reverting check-in.", "error");
      return;
    }
    
    setSubmitting(true);
    try {
      const payload = {
        selfie: capturedPhoto,
        photo: capturedPhoto,
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: address,
        location: gpsLocation,
        is_mocked: isMocked,
        user_agent: navigator.userAgent
      };
      const res = await attendanceApi.checkIn(payload);
      setAttendance(prev => ({ ...prev, attendance_record: res.data.attendance }));
      showToast('Checked in successfully!', 'success');
      closeAttendanceModal();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Check-in failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckOutSubmit = async () => {
    if (submitting) return;
    if (!capturedPhoto) {
      showToast("Check-out selfie is mandatory. Please capture your photo first.", "warning");
      return;
    }
    if (!coords.latitude || !coords.longitude) {
      showToast("GPS location coordinates are mandatory to mark attendance.", "error");
      return;
    }
    if (isMocked) {
      showToast("Fake/Mock GPS location detected! Reverting check-out.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        selfie: capturedPhoto,
        photo: capturedPhoto,
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: address,
        location: gpsLocation,
        is_mocked: isMocked,
        user_agent: navigator.userAgent
      };
      const res = await attendanceApi.checkOut(payload);
      setAttendance(prev => ({ ...prev, attendance_record: res.data.attendance }));
      showToast('Checked out successfully!', 'success');
      closeAttendanceModal();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Check-out failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Determine dashboard link path based on role
  const getDashboardPath = () => {
    switch (user.role) {
      case 'MD': return '/md-dashboard';
      case 'HR': return '/hr-dashboard';
      case 'Manager': return '/manager-dashboard';
      case 'TeamLead': return '/tl-dashboard';
      default: return '/employee-dashboard';
    }
  };

  return (
    <aside className="sidebar">
      {/* Dashboard Link */}
      <Link 
        to={getDashboardPath()} 
        state={user.role === 'Manager' ? { tab: 'overview' } : undefined}
        className={location.pathname === getDashboardPath() && (!location.state?.tab || location.state?.tab === 'overview') ? 'active' : ''}
      >
        <i className="fa-solid fa-gauge" style={{ color: '#3b82f6' }}></i>
        <span>Dashboard</span>
      </Link>

      {/* MD PERMISSIONS */}
      {user.role === 'MD' && (
        <>
          <div className="menu-item" onClick={() => toggleMenu('createAccountMenu')}>
            <span><i className="fa-solid fa-user-plus" style={{ color: '#f59e0b' }}></i> Create Account</span>
            <i className={`fa-solid fa-angle-down ${menus.createAccountMenu ? 'fa-rotate-180' : ''}`} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
          </div>
          <div className={`dropdown ${menus.createAccountMenu ? 'active' : ''}`}>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fa-solid fa-user"></i> Register Account
            </NavLink>
          </div>

          <div className="menu-item" onClick={() => toggleMenu('memberListMenu')}>
            <span><i className="fa-solid fa-users" style={{ color: '#10b981' }}></i> Member List</span>
            <i className={`fa-solid fa-angle-down ${menus.memberListMenu ? 'fa-rotate-180' : ''}`} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
          </div>
          <div className={`dropdown ${menus.memberListMenu ? 'active' : ''}`}>
            <NavLink to="/hr-list" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-user-tie"></i> HR List</NavLink>
            <NavLink to="/manager-list" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-briefcase"></i> Manager List</NavLink>
            <NavLink to="/tl-list" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-sitemap"></i> Team Lead List</NavLink>
            <NavLink to="/employee-list" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-user"></i> Employee List</NavLink>
          </div>


          <NavLink to="/leave-requests" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#eab308' }}></i>
            <span>Leave Approvals</span>
          </NavLink>
          <NavLink to="/project-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-folder-open" style={{ color: '#14b8a6' }}></i>
            <span>Projects</span>
          </NavLink>
          <NavLink to="/attendance-list" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#eab308' }}></i>
            <span>Daily Attendance</span>
          </NavLink>
          <NavLink to="/monthly-attendance" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar" style={{ color: '#a855f7' }}></i>
            <span>Monthly Attendance</span>
          </NavLink>
          <NavLink to="/all-leaves" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-clipboard-check" style={{ color: '#22c55e' }}></i>
            <span>All Leaves</span>
          </NavLink>
          <NavLink to="/attendance-approvals" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-circle-check" style={{ color: '#06b6d4' }}></i>
            <span>Attendance Approvals</span>
          </NavLink>
          <NavLink to="/holiday-approvals" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-umbrella" style={{ color: '#f59e0b' }}></i>
            <span>Holiday Approvals</span>
          </NavLink>

          <div className="menu-item" onClick={() => toggleMenu('websiteCmsMenu')}>
            <span><i className="fa-solid fa-globe" style={{ color: '#0284c7' }}></i> Website CMS</span>
            <i className={`fa-solid fa-angle-down ${menus.websiteCmsMenu ? 'fa-rotate-180' : ''}`} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
          </div>
          <div className={`dropdown ${menus.websiteCmsMenu ? 'active' : ''}`}>
            <NavLink to={ROUTES.ADMIN_CMS_CAROUSEL} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-images"></i> Hero Banners</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_PROJECTS} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-layer-group"></i> Portfolio</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_BLOGS} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-newspaper"></i> Blog Management</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_TEAM} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-people-group"></i> Team Members</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_TESTIMONIALS} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-quote-left"></i> Testimonials</NavLink>
          </div>
        </>
      )}

      {/* HR PERMISSIONS */}
      {user.role === 'HR' && (
        <>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-users-gear" style={{ color: '#ec4899' }}></i>
            <span>Accounts</span>
          </NavLink>

          <div className="menu-item" onClick={() => toggleMenu('hrMenu')}>
            <span><i className="fa-solid fa-users" style={{ color: '#f59e0b' }}></i> HR Tools</span>
            <i className={`fa-solid fa-angle-down ${menus.hrMenu ? 'fa-rotate-180' : ''}`} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
          </div>
          <div className={`dropdown ${menus.hrMenu ? 'active' : ''}`}>
            <NavLink to="/leave-status" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-calendar-check"></i> Leave Portal</NavLink>
            <NavLink to="/hr-approved-leaves" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-clipboard-check"></i> HR Approved Leaves</NavLink>
            <NavLink to="/leave-requests" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-calendar-minus"></i> All Leave Requests</NavLink>
          </div>

          <div className="menu-item" onClick={() => toggleMenu('attendanceMenu')}>
            <span><i className="fa-solid fa-calendar-check" style={{ color: '#eab308' }}></i> Attendance</span>
            <i className={`fa-solid fa-angle-down ${menus.attendanceMenu ? 'fa-rotate-180' : ''}`} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
          </div>
          <div className={`dropdown ${menus.attendanceMenu ? 'active' : ''}`}>
            <NavLink to="/attendance-list" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-clipboard-user"></i> Daily Registry</NavLink>
            <NavLink to="/monthly-attendance" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-calendar-days"></i> Monthly Summary</NavLink>
            <NavLink to="/attendance-correct" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-pen-to-square"></i> Correction (Single)</NavLink>
            <NavLink to="/attendance-correct-bulk" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-layer-group"></i> Correction (Bulk)</NavLink>
            <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-calendar-check"></i> My Attendance</NavLink>
          </div>

          <div className="menu-item" onClick={() => toggleMenu('financeMenu')}>
            <span><i className="fa-solid fa-wallet" style={{ color: '#10b981' }}></i> Finance</span>
            <i className={`fa-solid fa-angle-down ${menus.financeMenu ? 'fa-rotate-180' : ''}`} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
          </div>
          <div className={`dropdown ${menus.financeMenu ? 'active' : ''}`}>
            <NavLink to="/finance/invoices" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-file-invoice-dollar"></i> Invoices</NavLink>
            <NavLink to="/finance/clients/new" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-user-plus"></i> Create Client</NavLink>
            <NavLink to="/finance/services/new" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-gears"></i> Create Service</NavLink>
            <NavLink to="/finance/invoices/create" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-receipt"></i> Create Invoice</NavLink>
            <NavLink to="/finance/salary-structures" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-calculator"></i> Salary Structures</NavLink>
            <NavLink to="/finance/payroll" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-file-invoice-dollar"></i> Payslips / Payroll</NavLink>
          </div>

          <NavLink to="/holidays" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-umbrella-beach" style={{ color: '#ef4444' }}></i>
            <span>Holiday Calendar</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-gear" style={{ color: '#8b5cf6' }}></i>
            <span>HR Settings</span>
          </NavLink>
          <NavLink to="/questions" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-circle-question" style={{ color: '#8b5cf6' }}></i>
            <span>Questions</span>
          </NavLink>
          <NavLink to="/project-dashboard" className={({ isActive }) => isActive ? 'active' : ''} id="linkProjectsHR">
            <i className="fa-solid fa-folder-open" style={{ color: '#14b8a6' }}></i>
            <span>Projects</span>
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-list-check" style={{ color: '#22c55e' }}></i>
            <span>Tasks & Reports</span>
          </NavLink>

          <div className="menu-item" onClick={() => toggleMenu('websiteCmsMenu')}>
            <span><i className="fa-solid fa-globe" style={{ color: '#0284c7' }}></i> Website CMS</span>
            <i className={`fa-solid fa-angle-down ${menus.websiteCmsMenu ? 'fa-rotate-180' : ''}`} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}></i>
          </div>
          <div className={`dropdown ${menus.websiteCmsMenu ? 'active' : ''}`}>
            <NavLink to={ROUTES.ADMIN_CMS_CAROUSEL} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-images"></i> Hero Banners</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_PROJECTS} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-layer-group"></i> Portfolio</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_BLOGS} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-newspaper"></i> Blog Management</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_TEAM} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-people-group"></i> Team Members</NavLink>
            <NavLink to={ROUTES.ADMIN_CMS_TESTIMONIALS} className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-quote-left"></i> Testimonials</NavLink>
          </div>
        </>
      )}

      {/* MANAGER PERMISSIONS */}
      {user.role === 'Manager' && (
        <>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-user-plus" style={{ color: '#22c55e' }}></i>
            <span>Add Member</span>
          </NavLink>
          <NavLink to="/project-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-folder-open" style={{ color: '#14b8a6' }}></i>
            <span>Projects & Teams</span>
          </NavLink>
          <Link 
            to="/manager-dashboard" 
            state={{ tab: 'developers' }} 
            className={location.pathname === '/manager-dashboard' && location.state?.tab === 'developers' ? 'active' : ''}
          >
            <i className="fa-solid fa-users" style={{ color: '#22c55e' }}></i>
            <span>Developers List</span>
          </Link>
          <Link 
            to="/manager-dashboard" 
            state={{ tab: 'teamleads' }} 
            className={location.pathname === '/manager-dashboard' && location.state?.tab === 'teamleads' ? 'active' : ''}
          >
            <i className="fa-solid fa-users-gear" style={{ color: '#f59e0b' }}></i>
            <span>Team Leads List</span>
          </Link>
          <NavLink to="/leave-status" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#6366f1' }}></i>
            <span>Leave Portal</span>
          </NavLink>
          <NavLink to="/manager-approved-leaves" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-clipboard-check" style={{ color: '#eab308' }}></i>
            <span>Manager Approved Leaves</span>
          </NavLink>
          <NavLink to="/leave-requests" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-minus" style={{ color: '#f43f5e' }}></i>
            <span>TeamLead/Emp Leaves</span>
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-list-check" style={{ color: '#a855f7' }}></i>
            <span>Tasks & Reports</span>
          </NavLink>
          <NavLink to="/attendance-list" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#eab308' }}></i>
            <span>Team Attendance</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-user-circle" style={{ color: '#6366f1' }}></i>
            <span>My Profile</span>
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#06b6d4' }}></i>
            <span>My Attendance</span>
          </NavLink>
          <NavLink to="/payslips" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-file-invoice-dollar" style={{ color: '#10b981' }}></i>
            <span>My Payslips</span>
          </NavLink>
        </>
      )}

      {/* TEAM LEAD PERMISSIONS */}
      {user.role === 'TeamLead' && (
        <>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-user-circle" style={{ color: '#6366f1' }}></i>
            <span>My Profile</span>
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#06b6d4' }}></i>
            <span>My Attendance</span>
          </NavLink>
          <NavLink to="/attendance-list" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#eab308' }}></i>
            <span>Team Attendance</span>
          </NavLink>
          <NavLink to="/payslips" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-file-invoice-dollar" style={{ color: '#10b981' }}></i>
            <span>My Payslips</span>
          </NavLink>
          <NavLink to="/holidays" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-days" style={{ color: '#f43f5e' }}></i>
            <span>Attendance Calendar</span>
          </NavLink>
          <NavLink to="/leave-status" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#6366f1' }}></i>
            <span>Leave Portal</span>
          </NavLink>
          <NavLink to="/tl-approved-leaves" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-clipboard-check" style={{ color: '#14b8a6' }}></i>
            <span>TL Approved Leaves</span>
          </NavLink>
          <NavLink to="/leave-requests" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-minus" style={{ color: '#f43f5e' }}></i>
            <span>Employee Leaves</span>
          </NavLink>
          <NavLink to="/project-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-folder-open" style={{ color: '#14b8a6' }}></i>
            <span>Projects</span>
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-list-check" style={{ color: '#22c55e' }}></i>
            <span>Tasks & Reports</span>
          </NavLink>
        </>
      )}

      {/* EMPLOYEE PERMISSIONS */}
      {user.role === 'Employee' && (
        <>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-user-circle" style={{ color: '#6366f1' }}></i>
            <span>My Profile</span>
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#06b6d4' }}></i>
            <span>My Attendance</span>
          </NavLink>
          <NavLink to="/payslips" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-file-invoice-dollar" style={{ color: '#10b981' }}></i>
            <span>My Payslips</span>
          </NavLink>
          <NavLink to="/holidays" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-days" style={{ color: '#f43f5e' }}></i>
            <span>Attendance Calendar</span>
          </NavLink>
          <NavLink to="/leave-status" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#6366f1' }}></i>
            <span>Leave Portal</span>
          </NavLink>

          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fa-solid fa-list-check" style={{ color: '#22c55e' }}></i>
            <span>Tasks & Reports</span>
          </NavLink>
        </>
      )}

      {/* Messages */}
      <NavLink to="/messages" className={({ isActive }) => isActive ? 'active' : ''} style={{ position: 'relative' }}>
        <i className="fa-solid fa-comments" style={{ color: '#06b6d4' }}></i>
        <span>Messages</span>
        {msgUnreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '8px',
            background: '#ef4444',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 800,
            minWidth: '18px',
            height: '18px',
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            lineHeight: 1,
          }}>
            {msgUnreadCount > 99 ? '99+' : msgUnreadCount}
          </span>
        )}
      </NavLink>

      {/* Check In / Out Footer block inside sidebar */}
      <div className="sidebar-footer">
        {loadingAttendance ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>
            <i className="fa-solid fa-spinner fa-spin"></i> Loading...
          </div>
        ) : attendance?.on_leave_today ? (
          <button className="checkin-btn" style={{ background: '#ef4444', cursor: 'default' }} disabled>
            <i className="fa-solid fa-umbrella-beach"></i> On Leave
          </button>
        ) : attendance?.attendance_record?.check_in_time && !attendance?.attendance_record?.check_out_time ? (
          <button className="checkout-btn" onClick={() => openAttendanceModal(false)}>
            <i className="fa-solid fa-circle-xmark"></i> Check Out
          </button>
        ) : attendance?.attendance_record?.check_in_time && attendance?.attendance_record?.check_out_time ? (
          <button className="checkin-btn" style={{ background: '#10b981', cursor: 'default' }} disabled>
            <i className="fa-solid fa-circle-check"></i> Done today
          </button>
        ) : (
          <button className="checkin-btn" onClick={() => openAttendanceModal(true)}>
            <i className="fa-solid fa-circle-check"></i> Check In
          </button>
        )}
      </div>

      {/* Attendance Camera & Location Modal */}
      {showModal && (
        <div className="attendance-modal-overlay">
          <div className="attendance-modal">
            <div className="attendance-modal-header">
              <h3>
                <i className={`fa-solid ${isCheckInMode ? 'fa-sign-in-alt' : 'fa-sign-out-alt'}`} style={{ marginRight: '8px', color: isCheckInMode ? 'var(--success)' : 'var(--danger)' }}></i>
                Attendance {isCheckInMode ? 'Check In' : 'Check Out'}
              </h3>
              <button className="attendance-modal-close" onClick={closeAttendanceModal}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="attendance-modal-body">
              {/* Camera Preview or Captured Image */}
              <div className="camera-preview-container">
                {capturedPhoto ? (
                  <img src={capturedPhoto} className="camera-preview-img" alt="Face Capture" />
                ) : (
                  <video ref={videoRef} className="camera-video" autoPlay playsInline muted></video>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              </div>

              {/* Geolocation Status Box */}
              <div className={`location-info-box ${gpsLoading ? 'loading' : gpsError ? 'error' : 'success'}`}>
                {gpsLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <div className="location-text-container">
                      <div className="location-title">Acquiring GPS...</div>
                      <div className="location-desc">Verifying your physical location coords</div>
                    </div>
                  </>
                ) : gpsError ? (
                  <>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <div className="location-text-container">
                      <div className="location-title">GPS Acquisition Failed</div>
                      <div className="location-desc">{gpsError}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location-text-container">
                      <div className="location-title">Location Verified</div>
                      <div className="location-desc">{gpsLocation} (Accuracy Lock ✅)</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="attendance-modal-footer">
              <button 
                type="button" 
                className="modal-btn modal-btn-secondary" 
                onClick={closeAttendanceModal}
                disabled={submitting}
              >
                Cancel
              </button>

              {capturedPhoto ? (
                <>
                  <button 
                    type="button" 
                    className="modal-btn modal-btn-secondary" 
                    onClick={retakePhoto}
                    disabled={submitting}
                  >
                    <i className="fa-solid fa-rotate-left"></i> Retake
                  </button>
                  <button 
                    type="button" 
                    className="modal-btn modal-btn-primary" 
                    onClick={isCheckInMode ? handleCheckInSubmit : handleCheckOutSubmit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <><i className="fa-solid fa-spinner fa-spin"></i> Submitting...</>
                    ) : (
                      <><i className="fa-solid fa-cloud-arrow-up"></i> Submit Attendance</>
                    )}
                  </button>
                </>
              ) : (
                <button 
                  type="button" 
                  className="modal-btn modal-btn-primary" 
                  style={{ background: '#3b82f6' }}
                  onClick={capturePhoto}
                  disabled={gpsLoading}
                >
                  <i className="fa-solid fa-camera"></i> Capture Face
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
