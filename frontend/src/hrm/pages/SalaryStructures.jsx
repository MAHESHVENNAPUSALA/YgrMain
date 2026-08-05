import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const SalaryStructures = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const role = user?.role;

  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit structure modal state
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [monthlyGross, setMonthlyGross] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [hra, setHra] = useState('');
  const [transportAllowance, setTransportAllowance] = useState('');
  const [medicalAllowance, setMedicalAllowance] = useState('');
  const [specialAllowance, setSpecialAllowance] = useState('');
  const [bonus, setBonus] = useState('');
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
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [pan, setPan] = useState('');
  const [uan, setUan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [saving, setSaving] = useState(false);

  const loadStructures = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/salary-structures/');
      setStructures(res.data);
    } catch (err) {
      console.error('Error loading salary structures:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStructures();
  }, []);

  const handleEditClick = (struct) => {
    setSelectedStructure(struct);
    setMonthlyGross(struct.monthly_gross || '');
    setBasicSalary(struct.basic_salary || '');
    setHra(struct.hra || '');
    setTransportAllowance(struct.transport_allowance || '');
    setMedicalAllowance(struct.medical_allowance || '');
    setSpecialAllowance(struct.special_allowance || '');
    setBonus(struct.bonus || '');
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
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/api/salary-structures/', {
        employee: selectedStructure.employee,
        monthly_gross: monthlyGross,
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
      });
      showToast('Salary structure updated.', 'success');
      setSelectedStructure(null);
      loadStructures();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update salary structure.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <style>{`
        .structure-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          max-height: 480px;
          overflow-y: auto;
          padding-right: 8px;
        }
      `}</style>

      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Payroll Structures</h2>

      <div className="dashboard-panel-card">
        <div className="panel-header">
          <h2>Salary Configurations</h2>
        </div>
        <div className="panel-body">
          {loading ? (
            <div>Loading configurations...</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Monthly Gross</th>
                    <th>Net Salary Formula</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {structures.map((s) => (
                    <tr key={s.id}>
                      <td><strong>{s.employee_details?.emp_id}</strong></td>
                      <td>{s.employee_details?.name}</td>
                      <td>{s.employee_details?.department || 'N/A'}</td>
                      <td>₹{parseFloat(s.monthly_gross || 0).toFixed(2)}</td>
                      <td>Gross - (PF + ESI + PT + TDS + Deductions)</td>
                      <td><span className="badge-capsule present">Configured</span></td>
                      <td>
                        {['HR', 'MD'].includes(role) && (
                          <button className="btn" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => handleEditClick(s)}>
                            ⚙️ Manage
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedStructure && (
        <div className="modal-overlay" onClick={() => setSelectedStructure(null)}>
          <div className="modal-container" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Configure Salary for {selectedStructure.employee_details?.name}</h3>
              <button className="modal-close" onClick={() => setSelectedStructure(null)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSaveSubmit} className="attendance-form-card" style={{ textAlign: 'left' }}>
                <div className="structure-modal-grid">
                  <div>
                    <label>Monthly Gross Salary (₹)</label>
                    <input type="number" value={monthlyGross} onChange={(e) => setMonthlyGross(e.target.value)} required />
                  </div>
                  <div>
                    <label>Basic Salary (₹)</label>
                    <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} required />
                  </div>
                  <div>
                    <label>HRA Allowance (₹)</label>
                    <input type="number" value={hra} onChange={(e) => setHra(e.target.value)} required />
                  </div>
                  <div>
                    <label>Transport Allowance (₹)</label>
                    <input type="number" value={transportAllowance} onChange={(e) => setTransportAllowance(e.target.value)} />
                  </div>
                  <div>
                    <label>Medical Allowance (₹)</label>
                    <input type="number" value={medicalAllowance} onChange={(e) => setMedicalAllowance(e.target.value)} />
                  </div>
                  <div>
                    <label>Special Allowance (₹)</label>
                    <input type="number" value={specialAllowance} onChange={(e) => setSpecialAllowance(e.target.value)} />
                  </div>
                  <div>
                    <label>Bonus Allowance (₹)</label>
                    <input type="number" value={bonus} onChange={(e) => setBonus(e.target.value)} />
                  </div>
                  <div>
                    <label>PF Deduction Amount (₹)</label>
                    <input type="number" value={pfAmount} onChange={(e) => setPfAmount(e.target.value)} />
                  </div>
                  <div>
                    <label>ESI Deduction Amount (₹)</label>
                    <input type="number" value={esiAmount} onChange={(e) => setEsiAmount(e.target.value)} />
                  </div>
                  <div>
                    <label>Professional Tax (PT) (₹)</label>
                    <input type="number" value={ptAmount} onChange={(e) => setPtAmount(e.target.value)} />
                  </div>
                  <div>
                    <label>TDS Offset (₹)</label>
                    <input type="number" value={tdsAmount} onChange={(e) => setTdsAmount(e.target.value)} />
                  </div>
                  <div>
                    <label>Other Deductions (₹)</label>
                    <input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)} />
                  </div>
                  <div>
                    <label>Bank Name</label>
                    <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                  </div>
                  <div>
                    <label>Account Number</label>
                    <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                  </div>
                  <div>
                    <label>IFSC Code</label>
                    <input type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                  </div>
                  <div>
                    <label>PAN Card #</label>
                    <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn-submit-premium" disabled={saving} style={{ marginTop: '20px' }}>
                  {saving ? 'Saving changes...' : 'Publish Structure'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryStructures;
