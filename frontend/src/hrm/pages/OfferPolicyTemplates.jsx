import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import { offerPoliciesApi } from '../../services/api/documents';
import './OfferPolicyTemplates.css';

const POLICY_SECTIONS = [
  ['appointment', 'Appointment and nature of employment'],
  ['position_responsibilities', 'Position, responsibilities and reporting structure'],
  ['joining_workplace', 'Date of joining and place of work'],
  ['compensation', 'Compensation and salary payment'],
  ['probation', 'Probation period'],
  ['confirmation', 'Confirmation of employment'],
  ['working_hours', 'Working days and working hours'],
  ['attendance_leave', 'Attendance and leave policies'],
  ['holidays_weekly_off', 'Holidays and weekly offs'],
  ['transfer_relocation', 'Transfers and relocation'],
  ['business_travel', 'Business travel and expenses'],
  ['performance_evaluation', 'Performance evaluation'],
  ['conduct', 'Code of conduct and professional behaviour'],
  ['confidentiality', 'Confidentiality and non-disclosure'],
  ['intellectual_property', 'Intellectual property and ownership of work'],
  ['information_security', 'Information security and data protection'],
  ['company_assets', 'Use of company assets and IT systems'],
  ['conflict_outside_employment', 'Conflict of interest and outside employment'],
  ['background_verification', 'Background and document verification'],
  ['employee_representations', 'Employee representations and declarations'],
  ['notice_termination', 'Notice period and termination'],
  ['return_property', 'Return of company property'],
  ['company_policies', 'Applicable company policies'],
  ['general_terms', 'General terms and governing law'],
  ['acceptance', 'Acceptance and execution'],
];

const ANNEXURE_OPTIONS = [
  ['B', 'Benefits'],
  ['C', 'Confidentiality and IP undertaking'],
  ['D', 'Joining documentation checklist'],
  ['E', 'Role-specific conditions'],
];

const JOINING_DOCUMENTS = [
  'PAN card',
  'Identity proof',
  'Address proof',
  'Educational certificates',
  'Previous employment documents',
  'Relieving letter, where applicable',
  'Experience certificate, where applicable',
  'Bank account details',
  'Recent photograph',
  'Other HR-required documents listed by HR',
];

const COMPANY_DETAIL_FIELDS = [
  ['legal_name', 'Registered legal company name'],
  ['registered_office_address', 'Registered office address'],
  ['cin', 'CIN'],
  ['gstin', 'GSTIN (if applicable)'],
  ['official_email', 'Official contact email'],
  ['website', 'Official website'],
  ['authorized_signatory_name', 'Authorized signatory name'],
  ['authorized_signatory_title', 'Authorized signatory designation'],
];

const UNDERTAKING_SECTIONS = [
  ['confidential_information', 'Confidential information and permitted use'],
  ['data_handling', 'Company, client and personal data handling'],
  ['confidentiality_obligations', 'Confidentiality obligations and permitted disclosures'],
  ['intellectual_property', 'Intellectual property and pre-existing materials'],
  ['return_deletion', 'Return or deletion of information and materials'],
  ['employee_acknowledgement', 'Employee acknowledgement and applicable-law qualification'],
];

const BENEFIT_SECTIONS = [
  ['medical_insurance', 'Medical insurance'],
  ['leave_entitlements', 'Leave entitlements'],
  ['paid_holidays', 'Paid holidays'],
  ['training_development', 'Training and development'],
  ['performance_incentives', 'Performance incentives'],
  ['other_benefits', 'Other company-approved benefits'],
];

const emptySection = () => ({ content: '', subclauses: [] });

const emptyForm = () => ({
  name: '',
  version: '',
  employment_category: 'All',
  employment_type: 'All',
  effective_date: '',
  company_details: Object.fromEntries(COMPANY_DETAIL_FIELDS.map(([key]) => [key, ''])),
  requires_md_approval: true,
  sections: Object.fromEntries(POLICY_SECTIONS.map(([key]) => [key, emptySection()])),
  optional_clauses: [],
  annexures: Object.fromEntries(ANNEXURE_OPTIONS.map(([code]) => [code, {
    enabled: ['B', 'C', 'D'].includes(code),
    title: '',
    content: '',
    items: code === 'D' ? [...JOINING_DOCUMENTS] : [],
    sections: code === 'C' ? Object.fromEntries(UNDERTAKING_SECTIONS.map(([key]) => [key, ''])) : {},
    benefit_sections: code === 'B' ? Object.fromEntries(BENEFIT_SECTIONS.map(([key]) => [key, ''])) : {},
  }])),
  legal_approved: false,
  legal_reviewer_name: '',
  legal_approval_note: '',
});

const OfferPolicyTemplates = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm } = useDialog();
  const isHrOrMd = ['HR', 'MD'].includes(user?.role);
  const isMd = user?.role === 'MD';
  const [versions, setVersions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const response = await offerPoliciesApi.getVersions();
      setVersions(response.data || []);
    } catch (error) {
      showToast(error.response?.data?.detail || 'Could not load policy versions.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isHrOrMd) loadVersions();
  }, [isHrOrMd]);

  if (!isHrOrMd) return <Navigate to="/offer-letters" replace />;

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setPreviewing(false);
  };

  const editDraft = (policy) => {
    const next = emptyForm();
    const sections = policy.sections || {};
    POLICY_SECTIONS.forEach(([key]) => {
      const value = sections[key];
      next.sections[key] = typeof value === 'string' ? { content: value, subclauses: [] } : {
        content: value?.content || '',
        subclauses: value?.subclauses || [],
      };
    });
    (policy.annexures || []).forEach((item) => {
      if (next.annexures[item.code]) next.annexures[item.code] = {
        enabled: item.enabled !== false,
        title: item.title || '',
        content: item.content || '',
        items: item.items || next.annexures[item.code].items,
        sections: { ...next.annexures[item.code].sections, ...(item.sections || {}) },
        benefit_sections: { ...next.annexures[item.code].benefit_sections, ...(item.benefit_sections || {}) },
      };
    });
    Object.assign(next, {
      name: policy.name,
      version: policy.version,
      employment_category: policy.employment_category,
      employment_type: policy.employment_type || 'All',
      effective_date: policy.effective_date || '',
      company_details: { ...next.company_details, ...(policy.company_details || {}) },
      requires_md_approval: policy.requires_md_approval !== false,
      legal_approved: Boolean(policy.legal_approved),
      legal_reviewer_name: policy.legal_reviewer_name || '',
      legal_approval_note: policy.legal_approval_note || '',
      optional_clauses: sections.optional_clauses || [],
    });
    setEditingId(policy.id);
    setForm(next);
    setPreviewing(false);
  };

  const makePayload = () => ({
    ...form,
    sections: {
      ...Object.fromEntries(POLICY_SECTIONS.map(([key]) => [key, { enabled: true, ...form.sections[key] }])),
      optional_clauses: form.optional_clauses,
    },
    annexures: ANNEXURE_OPTIONS.map(([code, defaultTitle]) => ({
      code,
      title: form.annexures[code].title || defaultTitle,
      content: form.annexures[code].content,
      items: form.annexures[code].items,
      sections: form.annexures[code].sections,
      benefit_sections: form.annexures[code].benefit_sections,
      enabled: form.annexures[code].enabled,
    })),
    legal_approved: isMd && form.legal_approved,
  });

  const saveDraft = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = makePayload();
      const response = editingId
        ? await offerPoliciesApi.updateVersion(editingId, payload)
        : await offerPoliciesApi.createVersion(payload);
      setEditingId(response.data.id);
      showToast('Policy version saved as draft.', 'success');
      await loadVersions();
    } catch (error) {
      showToast(error.response?.data?.detail || 'Could not save policy draft.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const publishDraft = async () => {
    if (!editingId) {
      showToast('Save the policy draft before publishing.', 'warning');
      return;
    }
    setSaving(true);
    try {
      await offerPoliciesApi.publishVersion(editingId);
      showToast('Policy version published and locked.', 'success');
      resetForm();
      await loadVersions();
    } catch (error) {
      const missing = error.response?.data?.missing_sections;
      showToast(missing?.length ? `Complete required sections: ${missing.join(', ')}` : error.response?.data?.detail || 'Could not publish policy.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const retireVersion = async (policy) => {
    const confirmed = await showConfirm(`Retire ${policy.name} ${policy.version}? Existing offer snapshots will remain unchanged.`);
    if (!confirmed) return;
    try {
      await offerPoliciesApi.retireVersion(policy.id);
      showToast('Policy version retired.', 'success');
      await loadVersions();
    } catch (error) {
      showToast(error.response?.data?.detail || 'Could not retire policy version.', 'error');
    }
  };

  const updateSection = (key, value) => setForm((current) => ({ ...current, sections: { ...current.sections, [key]: value } }));
  const updateAnnexure = (code, key, value) => setForm((current) => ({
    ...current,
    annexures: { ...current.annexures, [code]: { ...current.annexures[code], [key]: value } },
  }));
  const updateOptionalClause = (index, key, value) => setForm((current) => ({
    ...current,
    optional_clauses: current.optional_clauses.map((clause, clauseIndex) => clauseIndex === index ? { ...clause, [key]: value } : clause),
  }));
  const updateCompanyDetail = (key, value) => setForm((current) => ({
    ...current,
    company_details: { ...current.company_details, [key]: value },
  }));
  const updateAnnexureItems = (code, value) => updateAnnexure(code, 'items', value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean));

  return (
    <main className="offer-policy-page">
      <header className="offer-policy-header">
        <div>
          <h1>Offer Policy Templates</h1>
          <p>Maintain reviewed terms as immutable, effective-dated versions.</p>
        </div>
        <button type="button" className="offer-policy-primary" onClick={resetForm}>
          <i className="fa-solid fa-plus" /> New Policy Version
        </button>
      </header>

      <section className="offer-policy-layout">
        <div className="offer-policy-list">
          <div className="offer-policy-list-head"><h2>Policy versions</h2><span>{versions.length}</span></div>
          {loading ? <p className="offer-policy-empty">Loading versions...</p> : versions.length === 0 ? <p className="offer-policy-empty">No policy versions created.</p> : (
            <table>
              <thead><tr><th>Name / version</th><th>Category / type</th><th>Effective</th><th>Status</th><th /></tr></thead>
              <tbody>
                {versions.map((policy) => (
                  <tr key={policy.id}>
                    <td><strong>{policy.name}</strong><small>{policy.version}</small></td>
                    <td>{policy.employment_category}<small>{policy.employment_type || 'All employment types'}</small></td>
                    <td>{policy.effective_date || 'Not set'}</td>
                    <td><span className={`offer-policy-status ${policy.status.toLowerCase()}`}>{policy.status}</span></td>
                    <td>
                      {policy.status === 'Draft' && <button type="button" className="offer-policy-text-button" onClick={() => editDraft(policy)}>Edit</button>}
                      {policy.status === 'Published' && <button type="button" className="offer-policy-text-button" onClick={() => retireVersion(policy)}>Retire</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <form className="offer-policy-editor" onSubmit={saveDraft}>
          <div className="offer-policy-editor-head">
            <div><h2>{editingId ? 'Edit draft version' : 'New draft version'}</h2><p>Only company-approved wording should be entered here.</p></div>
            <button type="button" className="offer-policy-text-button" onClick={() => setPreviewing(!previewing)}>{previewing ? 'Close preview' : 'Preview wording'}</button>
          </div>
          <div className="offer-policy-form-grid">
            <label>Policy name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label>Version<input required value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} placeholder="e.g. 2026.1" /></label>
            <label>Employee category<select value={form.employment_category} onChange={(e) => setForm({ ...form, employment_category: e.target.value })}><option>All</option><option>General</option><option>Fresher</option><option>Experienced</option><option>Senior</option><option>Contract</option></select></label>
            <label>Employment type<select value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })}><option>All</option><option>Full-time</option><option>Permanent</option><option>Fixed-term</option><option>Contract</option><option>Internship</option></select></label>
            <label>Effective date<input type="date" required value={form.effective_date} onChange={(e) => setForm({ ...form, effective_date: e.target.value })} /></label>
          </div>

          {isMd ? (
            <label className="offer-policy-toggle offer-policy-routing"><input type="checkbox" checked={form.requires_md_approval} onChange={(e) => setForm({ ...form, requires_md_approval: e.target.checked })} />Require MD approval before issue</label>
          ) : <p className="offer-policy-routing">MD approval is required for issued offers.</p>}

          {previewing ? (
            <div className="offer-policy-preview">
              <div><strong>{form.name || 'Untitled policy'} {form.version}</strong><span>Category: {form.employment_category} · Type: {form.employment_type} · Effective: {form.effective_date || 'Not set'}</span></div>
              <section><h3>Registered company details</h3><p>{COMPANY_DETAIL_FIELDS.map(([key, label]) => `${label}: ${form.company_details[key] || 'Not configured'}`).join('\n')}</p></section>
              {POLICY_SECTIONS.map(([key, title], index) => <section key={key}><h3>{index + 1}. {title}</h3><p>{form.sections[key].content || 'No wording entered.'}</p>{form.sections[key].subclauses.length > 0 && <ol>{form.sections[key].subclauses.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{item}</li>)}</ol>}</section>)}
              {ANNEXURE_OPTIONS.filter(([code]) => form.annexures[code].enabled).map(([code, title]) => <section key={code}><h3>Annexure {code} - {form.annexures[code].title || title}</h3>{code === 'D' ? <p>{form.annexures[code].items.join('\n')}</p> : code === 'C' ? UNDERTAKING_SECTIONS.map(([key, heading]) => <p key={key}><strong>{heading}:</strong> {form.annexures[code].sections[key] || 'Not configured.'}</p>) : code === 'B' ? BENEFIT_SECTIONS.map(([key, heading]) => <p key={key}><strong>{heading}:</strong> {form.annexures[code].benefit_sections[key] || 'Not configured.'}</p>) : <p>{form.annexures[code].content || 'No annexure wording entered.'}</p>}</section>)}
              {form.optional_clauses.filter((clause) => clause.enabled !== false).map((clause, index) => <section key={`optional-${index}`}><h3>{clause.title || 'Optional clause'}</h3><p>{clause.content || 'No wording entered.'}</p></section>)}
            </div>
          ) : (
            <>
              <section className="offer-policy-review">
                <h3>Registered company and signatory details</h3>
                <p className="offer-policy-help">These fields are absent from the current repository configuration and must be confirmed before a template can be published.</p>
                <div className="offer-policy-form-grid">
                  {COMPANY_DETAIL_FIELDS.map(([key, label]) => (
                    <label key={key}>{label}{key === 'registered_office_address' ? <textarea required value={form.company_details[key]} onChange={(e) => updateCompanyDetail(key, e.target.value)} rows="3" /> : <input required={!['gstin'].includes(key)} value={form.company_details[key]} onChange={(e) => updateCompanyDetail(key, e.target.value)} />}</label>
                  ))}
                </div>
              </section>

              <div className="offer-policy-section-fields">
                {POLICY_SECTIONS.map(([key, title], index) => (
                  <label key={key}>
                    <span>{index + 1}. {title}</span>
                    <textarea value={form.sections[key].content} onChange={(e) => updateSection(key, { ...form.sections[key], content: e.target.value })} rows="5" placeholder="Enter the complete company-approved clause. Publication blocks unresolved placeholders." />
                    <textarea value={form.sections[key].subclauses.join('\n')} onChange={(e) => updateSection(key, { ...form.sections[key], subclauses: e.target.value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean) })} rows="2" placeholder="Optional subclauses, one per line" />
                  </label>
                ))}
              </div>

              <section className="offer-policy-annexures">
                <h3>Optional clauses</h3>
                {form.optional_clauses.map((clause, index) => (
                  <div className="offer-policy-annexure" key={`clause-${index}`}>
                    <label className="offer-policy-toggle"><input type="checkbox" checked={clause.enabled !== false} onChange={(e) => updateOptionalClause(index, 'enabled', e.target.checked)} />Include this clause in applicable offers</label>
                    <input value={clause.title || ''} onChange={(e) => updateOptionalClause(index, 'title', e.target.value)} placeholder="Clause title" />
                    <textarea value={clause.content || ''} onChange={(e) => updateOptionalClause(index, 'content', e.target.value)} rows="4" placeholder="Company-approved clause wording" />
                    <button type="button" className="offer-policy-text-button" onClick={() => setForm((current) => ({ ...current, optional_clauses: current.optional_clauses.filter((_, clauseIndex) => clauseIndex !== index) }))}>Remove clause</button>
                  </div>
                ))}
                <button type="button" className="offer-policy-text-button" onClick={() => setForm((current) => ({ ...current, optional_clauses: [...current.optional_clauses, { title: '', content: '', enabled: true }] }))}>Add optional clause</button>
              </section>

              <section className="offer-policy-annexures">
                <h3>Annexures B–D are required for an offer pack; E is optional.</h3>
                {ANNEXURE_OPTIONS.map(([code, title]) => (
                  <div className="offer-policy-annexure" key={code}>
                    <label className="offer-policy-toggle"><input type="checkbox" checked={form.annexures[code].enabled} disabled={['B', 'C', 'D'].includes(code)} onChange={(e) => updateAnnexure(code, 'enabled', e.target.checked)} />Annexure {code}: {title}</label>
                    {form.annexures[code].enabled && <>
                      <input aria-label={`Annexure ${code} title`} value={form.annexures[code].title} onChange={(e) => updateAnnexure(code, 'title', e.target.value)} placeholder={title} />
                      {code === 'D'
                        ? <textarea aria-label="Joining document checklist" value={form.annexures[code].items.join('\n')} onChange={(e) => updateAnnexureItems(code, e.target.value)} rows="8" placeholder="One document requirement per line; tailor to this employment type." />
                        : code === 'C'
                          ? UNDERTAKING_SECTIONS.map(([key, heading]) => <label key={key}>{heading}<textarea rows="4" value={form.annexures[code].sections[key] || ''} onChange={(e) => updateAnnexure(code, 'sections', { ...form.annexures[code].sections, [key]: e.target.value })} /></label>)
                          : code === 'B'
                            ? BENEFIT_SECTIONS.map(([key, heading]) => <label key={key}>{heading}<textarea rows="3" value={form.annexures[code].benefit_sections[key] || ''} onChange={(e) => updateAnnexure(code, 'benefit_sections', { ...form.annexures[code].benefit_sections, [key]: e.target.value })} placeholder="Enter approved entitlement wording or the approved statement that no benefit applies." /></label>)
                            : <textarea aria-label={`Annexure ${code} wording`} value={form.annexures[code].content} onChange={(e) => updateAnnexure(code, 'content', e.target.value)} rows="7" placeholder="Enter approved role-specific conditions." />}
                    </>}
                  </div>
                ))}
              </section>

              <section className="offer-policy-review">
                <h3>Legal review</h3>
                {isMd && <label className="offer-policy-toggle"><input type="checkbox" checked={form.legal_approved} onChange={(e) => setForm({ ...form, legal_approved: e.target.checked })} />Legal review completed</label>}
                <div className="offer-policy-form-grid">
                  <label>Reviewer name<input value={form.legal_reviewer_name} onChange={(e) => setForm({ ...form, legal_reviewer_name: e.target.value })} /></label>
                  <label>Review note<textarea value={form.legal_approval_note} onChange={(e) => setForm({ ...form, legal_approval_note: e.target.value })} rows="2" /></label>
                </div>
              </section>
            </>
          )}

          <div className="offer-policy-actions">
            <button type="submit" className="offer-policy-primary" disabled={saving}>{saving ? 'Saving...' : 'Save draft'}</button>
            <button type="button" className="offer-policy-publish" onClick={publishDraft} disabled={saving || !editingId}>Publish version</button>
            {editingId && <button type="button" className="offer-policy-text-button" onClick={resetForm}>New version</button>}
          </div>
        </form>
      </section>
    </main>
  );
};

export default OfferPolicyTemplates;