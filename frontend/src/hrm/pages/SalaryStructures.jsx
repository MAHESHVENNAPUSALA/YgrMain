import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';
import './SalaryStructures.css';

const SalaryStructures = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const userRole = user?.role;
  const isHrOrMd = ['HR', 'MD'].includes(userRole);

  const [structures, setStructures] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Edit / Add Structure Modal
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [revisionReason, setRevisionReason] = useState('Regular annual compensation review');
  const [forceRevision, setForceRevision] = useState(false);
  const [conflictWarning, setConflictWarning] = useState(null);

  // Earnings
  const [monthlyGross, setMonthlyGross] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [hra, setHra] = useState('');
  const [transportAllowance, setTransportAllowance] = useState('0');
  const [medicalAllowance, setMedicalAllowance] = useState('0');
  const [specialAllowance, setSpecialAllowance] = useState('0');
  const [bonus, setBonus] = useState('0');

  // Deductions
  const [pfEnabled, setPfEnabled] = useState(true);
  const [pfRate, setPfRate] = useState('12.00');
  const [pfAmount, setPfAmount] = useState('0');
  const [esiEnabled, setEsiEnabled] = useState(true);
  const [esiRate, setEsiRate] = useState('0.75');
  const [esiAmount, setEsiAmount] = useState('0');
  const [ptEnabled, setPtEnabled] = useState(true);
  const [ptAmount, setPtAmount] = useState('200');
  const [tdsAmount, setTdsAmount] = useState('0');
  const [otherDeductions, setOtherDeductions] = useState('0');

  // Bank & Statutory
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [pan, setPan] = useState('');
  const [uan, setUan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [saving, setSaving] = useState(false);

  // History Modal State
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyTargetEmp, setHistoryTargetEmp] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [structRes, empRes] = await Promise.all([
        api.get('/api/salary-structures/'),
        api.get('/api/users/', { params: { scope: 'directory' } })
      ]);
      setStructures(structRes.data || []);
      setEmployees(empRes.data || []);
    } catch (err) {
      console.error('Error loading salary data:', err);
      showToast('Failed to load salary structures.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Dynamic live calculations
  const liveGross = useMemo(() => {
    const b = Number(basicSalary) || 0;
    const h = Number(hra) || 0;
    const t = Number(transportAllowance) || 0;
    const m = Number(medicalAllowance) || 0;
    const s = Number(specialAllowance) || 0;
    const bo = Number(bonus) || 0;
    return b + h + t + m + s + bo;
  }, [basicSalary, hra, transportAllowance, medicalAllowance, specialAllowance, bonus]);

  const liveDeductions = useMemo(() => {
    const pf = pfEnabled ? (Number(pfAmount) || 0) : 0;
    const esi = esiEnabled ? (Number(esiAmount) || 0) : 0;
    const pt = ptEnabled ? (Number(ptAmount) || 0) : 0;
    const tds = Number(tdsAmount) || 0;
    const o = Number(otherDeductions) || 0;
    return pf + esi + pt + tds + o;
  }, [pfEnabled, pfAmount, esiEnabled, esiAmount, ptEnabled, ptAmount, tdsAmount, otherDeductions]);

  const liveNetSalary = useMemo(() => {
    return Math.max(liveGross - liveDeductions, 0);
  }, [liveGross, liveDeductions]);

  // Auto-calculate allowances when gross is changed
  const handleGrossChange = (val) => {
    setMonthlyGross(val);
    const num = Number(val) || 0;
    if (num > 0) {
      const b = Math.round(num * 0.50);
      const h = Math.round(num * 0.30);
      const s = Math.max(num - b - h, 0);
      setBasicSalary(String(b));
      setHra(String(h));
      setSpecialAllowance(String(s));

      if (pfEnabled) {
        setPfAmount(String(Math.round(b * 0.12)));
      }
      if (esiEnabled) {
        setEsiAmount(String(Math.round(num * 0.0075)));
      }
    }
  };

  const handleOpenEdit = (struct) => {
    setSelectedStructure(struct);
    setSelectedEmployeeId(struct.employee);
    setMonthlyGross(struct.monthly_gross || '');
    setBasicSalary(struct.basic_salary || '');
    setHra(struct.hra || '');
    setTransportAllowance(struct.transport_allowance || '0');
    setMedicalAllowance(struct.medical_allowance || '0');
    setSpecialAllowance(struct.special_allowance || '0');
    setBonus(struct.bonus || '0');
    setPfEnabled(struct.pf_enabled ?? true);
    setPfRate(struct.pf_rate || '12.00');
    setPfAmount(struct.pf_amount || '0');
    setEsiEnabled(struct.esi_enabled ?? true);
    setEsiRate(struct.esi_rate || '0.75');
    setEsiAmount(struct.esi_amount || '0');
    setPtEnabled(struct.pt_enabled ?? true);
    setPtAmount(struct.pt_amount || '200');
    setTdsAmount(struct.tds_amount || '0');
    setOtherDeductions(struct.other_deductions || '0');
    setBankName(struct.bank_name || '');
    setAccountNumber(struct.account_number || '');
    setIfscCode(struct.ifsc_code || '');
    setPan(struct.pan || '');
    setUan(struct.uan || '');
    setAadhaar(struct.aadhaar || '');
    setEffectiveDate(struct.effective_date || new Date().toISOString().split('T')[0]);
    setRevisionReason('Annual salary revision');
    setConflictWarning(null);
    setForceRevision(false);
    setShowEditorModal(true);
  };

  const handleOpenAddNew = () => {
    setSelectedStructure(null);
    setSelectedEmployeeId('');
    setMonthlyGross('');
    setBasicSalary('');
    setHra('');
    setTransportAllowance('0');
    setMedicalAllowance('0');
    setSpecialAllowance('0');
    setBonus('0');
    setPfEnabled(true);
    setPfRate('12.00');
    setPfAmount('0');
    setEsiEnabled(true);
    setEsiRate('0.75');
    setEsiAmount('0');
    setPtEnabled(true);
    setPtAmount('200');
    setTdsAmount('0');
    setOtherDeductions('0');
    setBankName('');
    setAccountNumber('');
    setIfscCode('');
    setPan('');
    setUan('');
    setAadhaar('');
    setEffectiveDate(new Date().toISOString().split('T')[0]);
    setRevisionReason('Initial compensation structure setup');
    setConflictWarning(null);
    setForceRevision(false);
    setShowEditorModal(true);
  };

  const handleSaveStructure = async (e) => {
    e.preventDefault();
    const empId = selectedStructure ? selectedStructure.employee : selectedEmployeeId;
    if (!empId) {
      showToast('Please select an employee.', 'warning');
      return;
    }

    setSaving(true);
    setConflictWarning(null);

    const payload = {
      employee: empId,
      effective_date: effectiveDate,
      reason: revisionReason,
      force_revision: forceRevision,
      monthly_gross: monthlyGross || liveGross,
      basic_salary: basicSalary,
      hra,
      transport_allowance: transportAllowance,
      medical_allowance: medicalAllowance,
      special_allowance: specialAllowance,
      bonus,
      pf_enabled: pfEnabled,
      pf_rate: pfRate,
      pf_amount: pfAmount,
      esi_enabled: esiEnabled,
      esi_rate: esiRate,
      esi_amount: esiAmount,
      pt_enabled: ptEnabled,
      pt_amount: ptAmount,
      tds_amount: tdsAmount,
      other_deductions: otherDeductions,
      bank_name: bankName,
      account_number: accountNumber,
      ifsc_code: ifscCode,
      pan,
      uan,
      aadhaar,
    };

    try {
      await api.post('/api/salary-structures/', payload);
      showToast('Salary structure successfully saved and revision history recorded.', 'success');
      setShowEditorModal(false);
      loadData();
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.requires_confirmation) {
        setConflictWarning(err.response.data.detail);
      } else {
        showToast(err.response?.data?.detail || 'Failed to save salary structure.', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleViewHistory = async (empId, empName) => {
    setHistoryTargetEmp({ id: empId, name: empName });
    setShowHistoryModal(true);
    setLoadingHistory(true);
    try {
      const res = await api.get('/api/salary-structures/history/', { params: { employee_id: empId } });
      setHistoryRecords(res.data || []);
    } catch (err) {
      showToast('Failed to fetch salary revision history.', 'error');
    } finally {
      setLoadingHistory(false);
    }
  };

  // Metrics computation
  const summaryMetrics = useMemo(() => {
    const totalGross = structures.reduce((acc, s) => acc + (Number(s.monthly_gross) || 0), 0);
    const avgGross = structures.length ? Math.round(totalGross / structures.length) : 0;
    const configuredCount = structures.length;
    return { totalGross, avgGross, configuredCount };
  }, [structures]);

  // Filtered structures
  const filteredStructures = useMemo(() => {
    return structures.filter(s => {
      const term = searchTerm.toLowerCase();
      const empName = (s.employee_details?.name || s.employee_name || '').toLowerCase();
      const empId = (s.employee_details?.emp_id || '').toLowerCase();
      const matchesSearch = !term || empName.includes(term) || empId.includes(term);
      const matchesDept = deptFilter === 'All' || s.employee_details?.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [structures, searchTerm, deptFilter]);

  if (!isHrOrMd) {
    return (
      <div className="salary-mgmt-container">
        <div className="emp-empty-state">
          <i className="fa-solid fa-lock"></i>
          <h3>Confidential Compensation Portal</h3>
          <p>Access restricted to authorized HR and MD administrators only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="salary-mgmt-container">
      {/* Header */}
      <div className="salary-mgmt-header">
        <div className="salary-title-group">
          <h1>Salary & Compensation Management</h1>
          <p className="salary-subtitle">
            Configure employee salary components, statutory deductions (PF, ESI, PT, TDS), and inspect audit history.
          </p>
        </div>
        <div className="salary-header-actions">
          <button type="button" className="btn-secondary-corp" onClick={() => navigate('/finance/payroll')}>
            <i className="fa-solid fa-file-invoice-dollar"></i> Payslips & Payroll
          </button>
          <button type="button" className="btn-primary-corp" onClick={handleOpenAddNew}>
            <i className="fa-solid fa-plus"></i> Configure Structure
          </button>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="salary-summary-grid">
        <div className="salary-stat-card">
          <div className="salary-stat-info">
            <span>Total Monthly Outflow</span>
            <h3>₹{summaryMetrics.totalGross.toLocaleString('en-IN')}</h3>
          </div>
          <div className="salary-stat-icon icon-blue">
            <i className="fa-solid fa-money-bill-wave"></i>
          </div>
        </div>
        <div className="salary-stat-card">
          <div className="salary-stat-info">
            <span>Average Gross Salary</span>
            <h3>₹{summaryMetrics.avgGross.toLocaleString('en-IN')}</h3>
          </div>
          <div className="salary-stat-icon icon-emerald">
            <i className="fa-solid fa-chart-line"></i>
          </div>
        </div>
        <div className="salary-stat-card">
          <div className="salary-stat-info">
            <span>Configured Structures</span>
            <h3>{summaryMetrics.configuredCount} / {employees.length}</h3>
          </div>
          <div className="salary-stat-icon icon-amber">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
        </div>
        <div className="salary-stat-card">
          <div className="salary-stat-info">
            <span>Pending Setup</span>
            <h3>{Math.max(employees.length - summaryMetrics.configuredCount, 0)}</h3>
          </div>
          <div className="salary-stat-icon icon-purple">
            <i className="fa-solid fa-user-clock"></i>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="salary-filter-card">
        <div className="salary-search-wrapper">
          <i className="fa-solid fa-magnifying-glass salary-search-icon"></i>
          <input
            type="text"
            className="salary-search-input"
            placeholder="Search by employee name or staff ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Salary Structures Table */}
      <div className="salary-table-card">
        <div className="salary-table-wrapper">
          <table className="salary-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Staff ID</th>
                <th>Monthly Gross</th>
                <th>Basic Salary</th>
                <th>Total Allowances</th>
                <th>Deductions</th>
                <th>Net Payable</th>
                <th>Effective Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="emp-loading-state">
                    <div className="emp-spinner"></div>
                    <div>Loading salary structures...</div>
                  </td>
                </tr>
              ) : filteredStructures.length === 0 ? (
                <tr>
                  <td colSpan={9} className="emp-empty-state">
                    <i className="fa-solid fa-calculator"></i>
                    <div>No salary structures configured yet. Click "Configure Structure" above.</div>
                  </td>
                </tr>
              ) : (
                filteredStructures.map((s) => {
                  const empName = s.employee_details?.name || s.employee_full_name || s.employee_name || 'Staff Member';
                  const allowances = (Number(s.hra) || 0) + (Number(s.transport_allowance) || 0) +
                    (Number(s.medical_allowance) || 0) + (Number(s.special_allowance) || 0) + (Number(s.bonus) || 0);
                  const deductions = (Number(s.pf_amount) || 0) + (Number(s.esi_amount) || 0) +
                    (Number(s.pt_amount) || 0) + (Number(s.tds_amount) || 0) + (Number(s.other_deductions) || 0);
                  const net = Math.max((Number(s.monthly_gross) || (Number(s.basic_salary) + allowances)) - deductions, 0);

                  return (
                    <tr key={s.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{empName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{s.employee_details?.designation || 'Staff'}</div>
                      </td>
                      <td>
                        <span className="emp-id-badge">{s.employee_details?.emp_id || '—'}</span>
                      </td>
                      <td>
                        <span className="amount-bold">₹{Number(s.monthly_gross || 0).toLocaleString('en-IN')}</span>
                      </td>
                      <td>
                        <span>₹{Number(s.basic_salary || 0).toLocaleString('en-IN')}</span>
                      </td>
                      <td>
                        <span>₹{allowances.toLocaleString('en-IN')}</span>
                      </td>
                      <td>
                        <span className="amount-deduct">₹{deductions.toLocaleString('en-IN')}</span>
                      </td>
                      <td>
                        <span className="amount-net">₹{net.toLocaleString('en-IN')}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: '#475569' }}>{s.effective_date || 'Current'}</span>
                      </td>
                      <td>
                        <div className="action-buttons-group">
                          <button
                            type="button"
                            className="btn-icon-action"
                            title="View Salary Revision History"
                            onClick={() => handleViewHistory(s.employee, empName)}
                          >
                            <i className="fa-solid fa-clock-rotate-left"></i>
                          </button>
                          <button
                            type="button"
                            className="btn-icon-action btn-edit"
                            title="Manage Salary Components"
                            onClick={() => handleOpenEdit(s)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {showEditorModal && (
        <div className="corp-modal-overlay" onClick={() => !saving && setShowEditorModal(false)}>
          <div className="corp-modal-container salary-editor-modal" onClick={(e) => e.stopPropagation()}>
            <div className="corp-modal-header">
              <h2>
                <i className="fa-solid fa-calculator"></i>
                {selectedStructure ? `Configure Compensation: ${selectedStructure.employee_details?.name || selectedStructure.employee_name}` : 'Setup Compensation Structure'}
              </h2>
              <button type="button" className="corp-modal-close" onClick={() => setShowEditorModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveStructure}>
              <div className="corp-modal-body">
                {conflictWarning && (
                  <div className="warning-lock-box">
                    <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '1.2rem', marginTop: '2px' }}></i>
                    <div>
                      <strong>Historical Payroll Lock Alert</strong>
                      <p style={{ margin: '4px 0 8px 0' }}>{conflictWarning}</p>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700 }}>
                        <input
                          type="checkbox"
                          checked={forceRevision}
                          onChange={(e) => setForceRevision(e.target.checked)}
                        />
                        Authorize Adjustment without altering locked payslips
                      </label>
                    </div>
                  </div>
                )}

                {/* Employee Selection if New */}
                {!selectedStructure && (
                  <div className="editor-section-card">
                    <div className="editor-section-title">
                      <i className="fa-solid fa-user"></i> Select Employee
                    </div>
                    <select
                      className="corp-form-select"
                      required
                      value={selectedEmployeeId}
                      onChange={(e) => setSelectedEmployeeId(e.target.value)}
                    >
                      <option value="">-- Choose Employee --</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.first_name || emp.username} ({emp.emp_id || 'ID N/A'}) — {emp.role}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Revisions & Effective Dates */}
                <div className="editor-section-card">
                  <div className="editor-section-title">
                    <i className="fa-solid fa-calendar-days"></i> Effective Date & Revision Context
                  </div>
                  <div className="editor-grid-2">
                    <div className="corp-form-group">
                      <label className="corp-form-label">Effective Date *</label>
                      <input
                        type="date"
                        required
                        className="corp-form-input"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                      />
                    </div>
                    <div className="corp-form-group">
                      <label className="corp-form-label">Revision Reason *</label>
                      <input
                        type="text"
                        required
                        className="corp-form-input"
                        placeholder="e.g. Annual Appraisal, Promotion, Adjustment"
                        value={revisionReason}
                        onChange={(e) => setRevisionReason(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Earnings */}
                <div className="editor-section-card">
                  <div className="editor-section-title">
                    <i className="fa-solid fa-coins"></i> Earnings Components
                  </div>
                  <div className="editor-grid-3">
                    <div className="corp-form-group">
                      <label className="corp-form-label">Monthly Gross (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        placeholder="e.g. 60000"
                        value={monthlyGross}
                        onChange={(e) => handleGrossChange(e.target.value)}
                      />
                    </div>
                    <div className="corp-form-group">
                      <label className="corp-form-label">Basic Salary (₹) *</label>
                      <input
                        type="number"
                        required
                        className="corp-form-input"
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(e.target.value)}
                      />
                    </div>
                    <div className="corp-form-group">
                      <label className="corp-form-label">House Rent Allowance (HRA) (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        value={hra}
                        onChange={(e) => setHra(e.target.value)}
                      />
                    </div>
                    <div className="corp-form-group">
                      <label className="corp-form-label">Transport Allowance (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        value={transportAllowance}
                        onChange={(e) => setTransportAllowance(e.target.value)}
                      />
                    </div>
                    <div className="corp-form-group">
                      <label className="corp-form-label">Medical Allowance (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        value={medicalAllowance}
                        onChange={(e) => setMedicalAllowance(e.target.value)}
                      />
                    </div>
                    <div className="corp-form-group">
                      <label className="corp-form-label">Special Allowance (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        value={specialAllowance}
                        onChange={(e) => setSpecialAllowance(e.target.value)}
                      />
                    </div>
                    <div className="corp-form-group">
                      <label className="corp-form-label">Bonus Allowance (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div className="editor-section-card">
                  <div className="editor-section-title">
                    <i className="fa-solid fa-receipt"></i> Statutory & Discretionary Deductions
                  </div>
                  <div className="editor-grid-3">
                    <div className="corp-form-group">
                      <label className="corp-form-label">PF Deduction (₹)</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={pfEnabled}
                          onChange={(e) => setPfEnabled(e.target.checked)}
                        />
                        <input
                          type="number"
                          disabled={!pfEnabled}
                          className="corp-form-input"
                          value={pfAmount}
                          onChange={(e) => setPfAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="corp-form-group">
                      <label className="corp-form-label">ESI Deduction (₹)</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={esiEnabled}
                          onChange={(e) => setEsiEnabled(e.target.checked)}
                        />
                        <input
                          type="number"
                          disabled={!esiEnabled}
                          className="corp-form-input"
                          value={esiAmount}
                          onChange={(e) => setEsiAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="corp-form-group">
                      <label className="corp-form-label">Professional Tax (PT) (₹)</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={ptEnabled}
                          onChange={(e) => setPtEnabled(e.target.checked)}
                        />
                        <input
                          type="number"
                          disabled={!ptEnabled}
                          className="corp-form-input"
                          value={ptAmount}
                          onChange={(e) => setPtAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="corp-form-group">
                      <label className="corp-form-label">TDS (Tax Deducted) (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        value={tdsAmount}
                        onChange={(e) => setTdsAmount(e.target.value)}
                      />
                    </div>

                    <div className="corp-form-group">
                      <label className="corp-form-label">Other Deductions (₹)</label>
                      <input
                        type="number"
                        className="corp-form-input"
                        value={otherDeductions}
                        onChange={(e) => setOtherDeductions(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Live Real-time Calculation Display */}
                <div className="live-calc-box">
                  <div className="live-calc-item">
                    <span>Total Gross Earnings</span>
                    <h4 className="text-earnings">₹{liveGross.toLocaleString('en-IN')}</h4>
                  </div>
                  <div className="live-calc-item">
                    <span>Total Deductions</span>
                    <h4 className="text-deductions">-₹{liveDeductions.toLocaleString('en-IN')}</h4>
                  </div>
                  <div className="live-calc-item">
                    <span>Estimated Net Pay</span>
                    <h4 className="text-net">₹{liveNetSalary.toLocaleString('en-IN')}</h4>
                  </div>
                </div>
              </div>

              <div className="corp-modal-footer">
                <button type="button" className="btn-secondary-corp" onClick={() => setShowEditorModal(false)} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-corp" disabled={saving}>
                  {saving ? 'Publishing...' : 'Save & Record Revision'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Salary History Drawer / Modal */}
      {showHistoryModal && historyTargetEmp && (
        <div className="corp-modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="corp-modal-container" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="corp-modal-header">
              <h2><i className="fa-solid fa-clock-rotate-left"></i> Salary Revision History: {historyTargetEmp.name}</h2>
              <button type="button" className="corp-modal-close" onClick={() => setShowHistoryModal(false)}>✕</button>
            </div>
            <div className="corp-modal-body">
              {loadingHistory ? (
                <div className="emp-loading-state">
                  <div className="emp-spinner"></div>
                  <div>Loading salary history...</div>
                </div>
              ) : historyRecords.length === 0 ? (
                <div className="emp-empty-state">
                  <i className="fa-solid fa-timeline"></i>
                  <div>No historical revision records found for this employee yet.</div>
                </div>
              ) : (
                <div className="timeline-list">
                  {historyRecords.map((rec) => (
                    <div key={rec.id} className="timeline-item">
                      <div className="timeline-meta">
                        Effective from {rec.effective_date} • Recorded by {rec.revised_by_name} on {new Date(rec.created_at).toLocaleDateString()}
                      </div>
                      <div className="timeline-title">
                        Net Salary: ₹{Number(rec.net_salary).toLocaleString('en-IN')} / month
                      </div>
                      <div className="timeline-breakdown">
                        <span><strong>Gross:</strong> ₹{Number(rec.gross_salary).toLocaleString('en-IN')}</span>
                        <span><strong>Basic:</strong> ₹{Number(rec.basic_salary).toLocaleString('en-IN')}</span>
                        <span><strong>HRA:</strong> ₹{Number(rec.hra).toLocaleString('en-IN')}</span>
                        <span><strong>PF:</strong> ₹{Number(rec.pf_deduction).toLocaleString('en-IN')}</span>
                        <span><strong>Deductions:</strong> ₹{Number(rec.total_deductions).toLocaleString('en-IN')}</span>
                      </div>
                      {rec.reason && (
                        <div className="timeline-reason">
                          “{rec.reason}”
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="corp-modal-footer">
              <button type="button" className="btn-secondary-corp" onClick={() => setShowHistoryModal(false)}>
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryStructures;
