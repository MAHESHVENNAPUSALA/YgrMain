import React, { useState } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const Register = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const role = user?.role;
  const defaultRole = location.state?.defaultRole || 'Employee';

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [doj, setDoj] = useState('');
  const [empStatus, setEmpStatus] = useState('Fresher');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [teamName, setTeamName] = useState('');
  const [expYears, setExpYears] = useState('');
  const [prevCompany, setPrevCompany] = useState('');
  const [address, setAddress] = useState('');
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [profilePic, setProfilePic] = useState(null);
  const [document, setDocument] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'warning');
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);
      formData.append('gender', gender);
      formData.append('date_of_birth', dob);
      formData.append('date_of_joining', doj);
      formData.append('status', empStatus);
      formData.append('salary', salary);
      formData.append('department', department);
      formData.append('team_name', teamName);
      formData.append('experience_years', expYears);
      formData.append('previous_company', prevCompany);
      formData.append('address', address);
      formData.append('role', selectedRole);

      if (profilePic) {
        formData.append('profile_pic', profilePic);
      }
      if (document) {
        formData.append('document', document);
      }

      await api.post('/api/register/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      showToast(`${selectedRole} registered successfully!`, 'success');
      // Reset form
      setFullname('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setDob('');
      setDoj('');
      setSalary('');
      setDepartment('');
      setTeamName('');
      setExpYears('');
      setPrevCompany('');
      setAddress('');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to register account.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (role !== 'HR' && role !== 'MD' && role !== 'Manager') {
    return <div style={{ color: 'var(--danger)', fontWeight: 700, padding: '20px' }}>Access Denied: Only HR, MD or Manager can access registration page.</div>;
  }

  return (
    <div>
      <style>{`
        .register-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .register-premium-card {
          max-width: 780px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .register-premium-card .panel-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          padding: 22px 28px;
        }
        .register-premium-card .panel-header h2 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .register-premium-card .panel-body {
          padding: 30px;
        }
        .register-premium-card .form-group {
          margin-bottom: 18px;
        }
        .register-premium-card .form-group label {
          font-size: 0.76rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }
        .register-premium-card .form-group input, 
        .register-premium-card .form-group select, 
        .register-premium-card .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.2s ease-in-out;
          font-family: inherit;
        }
        .register-premium-card .form-group input:focus, 
        .register-premium-card .form-group select:focus, 
        .register-premium-card .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .register-premium-card .btn-submit-premium {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
          margin-top: 10px;
        }
        .register-premium-card .btn-submit-premium:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .register-premium-card .btn-submit-premium:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}</style>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Account Registration</h2>

      <div className="register-premium-card">
        <div className="panel-header">
          <h2>Create Staff Account</h2>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div className="register-grid">
              <div className="form-group">
                <label>Account Role Category</label>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <option value="Employee">Employee / Developer</option>
                  <option value="TeamLead">Team Leader</option>
                  {(role === 'HR' || role === 'MD') && <option value="Manager">Manager</option>}
                  {role === 'MD' && <option value="HR">HR</option>}
                  {role === 'MD' && <option value="MD">Managing Director</option>}
                </select>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email Address (Username)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date of Joining</label>
                <input type="date" value={doj} onChange={(e) => setDoj(e.target.value)} />
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label>Experience (Years)</label>
                <input type="number" value={expYears} onChange={(e) => setExpYears(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Previous Company Name</label>
                <input type="text" value={prevCompany} onChange={(e) => setPrevCompany(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Salary (LPA / Monthly)</label>
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label>Department</label>
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. technology" />
              </div>
              <div className="form-group">
                <label>Team Scope</label>
                <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. alpha-team" />
              </div>
              <div className="form-group">
                <label>Employment Status</label>
                <select value={empStatus} onChange={(e) => setEmpStatus(e.target.value)}>
                  <option value="Fresher">Fresher</option>
                  <option value="Experienced">Experienced</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Home Address</label>
              <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div className="form-group">
                <label>Profile Image File</label>
                <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} style={{ padding: '6px 0' }} />
              </div>
              <div className="form-group">
                <label>Contract Documents (PDF)</label>
                <input type="file" onChange={(e) => setDocument(e.target.files[0])} style={{ padding: '6px 0' }} />
              </div>
            </div>

            <button type="submit" className="btn-submit-premium" disabled={submitting}>
              {submitting ? 'Registering Account...' : 'Register Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
