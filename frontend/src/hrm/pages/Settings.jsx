import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import api from '../../services/api';
import { useToast } from '../../shared/context/ToastContext';

const Settings = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const role = user?.role;

  // State
  const [sandwichLeave, setSandwichLeave] = useState(false);
  const [mdApprovalRequired, setMdApprovalRequired] = useState(true);
  const [selectedWeeklyOffs, setSelectedWeeklyOffs] = useState([5, 6]);
  const [halfDayWorkingHours, setHalfDayWorkingHours] = useState(4.5);
  const [graceTime, setGraceTime] = useState(15);
  const [officeStartTime, setOfficeStartTime] = useState("09:30");
  const [officeEndTime, setOfficeEndTime] = useState("18:30");
  const [lateMarkRulesEnabled, setLateMarkRulesEnabled] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const weekdays = [
    { label: "Monday", value: 0 },
    { label: "Tuesday", value: 1 },
    { label: "Wednesday", value: 2 },
    { label: "Thursday", value: 3 },
    { label: "Friday", value: 4 },
    { label: "Saturday", value: 5 },
    { label: "Sunday", value: 6 }
  ];

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/hr-settings/');
      setSandwichLeave(res.data.sandwich_leave_enabled ?? false);
      setMdApprovalRequired(res.data.md_approval_required ?? true);
      
      const offDaysStr = res.data.weekly_off_days || "5,6";
      const offDaysArray = offDaysStr.split(",").filter(x => x.trim() !== "").map(Number);
      setSelectedWeeklyOffs(offDaysArray);
      
      setHalfDayWorkingHours(res.data.half_day_working_hours ?? 4.5);
      setGraceTime(res.data.grace_time ?? 15);
      
      if (res.data.office_start_time) {
        setOfficeStartTime(res.data.office_start_time.substring(0, 5));
      }
      if (res.data.office_end_time) {
        setOfficeEndTime(res.data.office_end_time.substring(0, 5));
      }
      setLateMarkRulesEnabled(res.data.late_mark_rules_enabled ?? true);
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleWeeklyOffToggle = (dayVal) => {
    if (selectedWeeklyOffs.includes(dayVal)) {
      setSelectedWeeklyOffs(selectedWeeklyOffs.filter(d => d !== dayVal));
    } else {
      setSelectedWeeklyOffs([...selectedWeeklyOffs, dayVal]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (role !== 'HR' && role !== 'MD') {
      showToast("Access Denied: Only HR or MD can update settings.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        sandwich_leave_enabled: sandwichLeave,
        md_approval_required: mdApprovalRequired,
        weekly_off_days: selectedWeeklyOffs.join(","),
        half_day_working_hours: parseFloat(halfDayWorkingHours),
        grace_time: parseInt(graceTime),
        office_start_time: officeStartTime + ":00",
        office_end_time: officeEndTime + ":00",
        late_mark_rules_enabled: lateMarkRulesEnabled
      };
      
      await api.put('/api/hr-settings/', payload);
      showToast("Attendance and Leave Policies updated successfully.", "success");
    } catch (err) {
      showToast(err.response?.data?.detail || "Failed to save settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  const isEditable = role === 'HR' || role === 'MD';

  return (
    <div>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>HR Management Settings</h2>

      <form onSubmit={handleSave} className="dashboard-panel-card" style={{ maxWidth: '700px', textAlign: 'left' }}>
        <div className="panel-header">
          <h2><i className="fa-solid fa-gears" style={{ color: 'var(--accent-blue)', marginRight: '8px' }}></i> Policy Configuration</h2>
        </div>
        <div className="panel-body">
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading policies...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Working Hours Section */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  Office Timings & Rules
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Office Start Time</label>
                    <input 
                      type="time" 
                      value={officeStartTime}
                      onChange={(e) => setOfficeStartTime(e.target.value)}
                      disabled={!isEditable}
                      style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Office End Time</label>
                    <input 
                      type="time" 
                      value={officeEndTime}
                      onChange={(e) => setOfficeEndTime(e.target.value)}
                      disabled={!isEditable}
                      style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Grace Time (Minutes)</label>
                    <input 
                      type="number" 
                      value={graceTime}
                      onChange={(e) => setGraceTime(e.target.value)}
                      disabled={!isEditable}
                      style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Half Day Working Hours</label>
                    <input 
                      type="number" 
                      step="0.5"
                      value={halfDayWorkingHours}
                      onChange={(e) => setHalfDayWorkingHours(e.target.value)}
                      disabled={!isEditable}
                      style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    id="lateMarkRulesEnabled"
                    checked={lateMarkRulesEnabled}
                    onChange={(e) => setLateMarkRulesEnabled(e.target.checked)}
                    disabled={!isEditable}
                    style={{ width: '16px', height: '16px', cursor: isEditable ? 'pointer' : 'default' }}
                  />
                  <label htmlFor="lateMarkRulesEnabled" style={{ fontSize: '13.5px', fontWeight: 700, color: '#475569', cursor: isEditable ? 'pointer' : 'default' }}>
                    Enable Late Mark Rules (Mark late check-in)
                  </label>
                </div>
              </div>

              {/* Weekly Off Configuration */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  Weekly Off Days
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '10px' }}>Select days of the week to treat as automatic "Week Offs".</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {weekdays.map(day => {
                    const isSelected = selectedWeeklyOffs.includes(day.value);
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => handleWeeklyOffToggle(day.value)}
                        disabled={!isEditable}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                          background: isSelected ? 'var(--primary-light)' : '#fff',
                          color: isSelected ? 'var(--primary)' : '#475569',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: isEditable ? 'pointer' : 'not-allowed',
                          transition: 'all 0.15s'
                        }}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Leave Policies Section */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  Leave & Approval Policies
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {/* Sandwich Leave Policy */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <input
                      type="checkbox"
                      id="sandwichLeave"
                      checked={sandwichLeave}
                      onChange={(e) => setSandwichLeave(e.target.checked)}
                      disabled={!isEditable}
                      style={{ width: '20px', height: '20px', cursor: isEditable ? 'pointer' : 'not-allowed', marginTop: '3px' }}
                    />
                    <div>
                      <label htmlFor="sandwichLeave" style={{ fontWeight: 700, color: 'var(--primary-color)', cursor: isEditable ? 'pointer' : 'not-allowed' }}>
                        Enable Sandwich Leave Policy
                      </label>
                      <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px', lineHeight: '1.5' }}>
                        When ON, Weekly Offs and Holidays sandwiched between two consecutive Leave / Absent days are automatically converted to Sandwich Leave (Loss of Pay).
                      </p>
                    </div>
                  </div>

                  {/* MD Approval Requirement */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <input
                      type="checkbox"
                      id="mdApproval"
                      checked={mdApprovalRequired}
                      onChange={(e) => setMdApprovalRequired(e.target.checked)}
                      disabled={!isEditable}
                      style={{ width: '20px', height: '20px', cursor: isEditable ? 'pointer' : 'not-allowed', marginTop: '3px' }}
                    />
                    <div>
                      <label htmlFor="mdApproval" style={{ fontWeight: 700, color: 'var(--primary-color)', cursor: isEditable ? 'pointer' : 'not-allowed' }}>
                        Enable MD Approval Requirement
                      </label>
                      <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px', lineHeight: '1.5' }}>
                        When ON, all leave requests approved by HR must also receive approval from the Managing Director to become final.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {isEditable && (
                <div style={{ marginTop: '10px' }}>
                  <button
                    type="submit"
                    disabled={saving}
                    className="quick-btn"
                    style={{
                      background: 'var(--primary)',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: 700,
                      cursor: saving ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {saving && <i className="fa-solid fa-spinner fa-spin"></i>}
                    {saving ? "Saving Policies..." : "Save Policy Configuration"}
                  </button>
                </div>
              )}

              {!isEditable && (
                <div style={{ color: 'var(--danger)', fontSize: '12.5px', fontWeight: 600 }}>
                  * Only HR administrators or MD users can modify company policies.
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Settings;
