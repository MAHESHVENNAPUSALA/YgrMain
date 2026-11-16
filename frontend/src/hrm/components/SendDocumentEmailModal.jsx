import React, { useState } from 'react';

/**
 * SendDocumentEmailModal
 * 
 * Reusable confirmation dialog for dispatching official HR documents
 * (Payslips, Offer Letters, Joining Letters, Relieving Letters) via email.
 * 
 * - Displays the employee's registered email address and name
 * - Displays the exact document title and attached PDF name
 * - Displays the configured sender address
 * - Allows forced resend if already sent
 * - Provides immediate visual feedback and loading states
 */
const SendDocumentEmailModal = ({
  isOpen,
  onClose,
  onSuccess,
  documentData, // { id, title, documentType, recipientName, recipientEmail, empId, emailStatus, emailSentAt, emailError, sendFn }
}) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !documentData) return null;

  const {
    id,
    title,
    documentType = 'document',
    recipientName = 'Employee',
    recipientEmail = '',
    empId = '',
    emailStatus = 'Not Sent',
    emailSentAt = null,
    emailError = null,
    sendFn, // async function(id, { force }) => Promise
  } = documentData;

  const isAlreadySent = emailStatus === 'Sent';
  const isFailed = emailStatus === 'Failed';
  const hasNoEmail = !recipientEmail || !recipientEmail.trim();

  const handleConfirmSend = async () => {
    if (hasNoEmail) {
      setError('Cannot dispatch email: This employee does not have a registered email address on file.');
      return;
    }

    setSending(true);
    setError(null);
    try {
      if (typeof sendFn === 'function') {
        const res = await sendFn(id, { force: isAlreadySent });
        if (onSuccess) {
          onSuccess(res?.data || { detail: 'Email queued successfully.' });
        }
      }
      onClose();
    } catch (err) {
      console.error('Error dispatching document email:', err);
      const msg = err.response?.data?.detail || err.message || 'Failed to dispatch email. Please check SMTP settings.';
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  const getTypeBadgeColor = () => {
    switch ((documentType || '').toLowerCase()) {
      case 'offer_letter':
      case 'offer letter':
        return { bg: '#e0e7ff', color: '#3730a3', label: 'Offer Letter' };
      case 'joining_letter':
      case 'joining letter':
        return { bg: '#dcfce7', color: '#166534', label: 'Joining Letter' };
      case 'appointment_letter':
      case 'appointment letter':
        return { bg: '#e0f2fe', color: '#0369a1', label: 'Appointment Letter' };
      case 'relieving_letter':
      case 'relieving letter':
        return { bg: '#fee2e2', color: '#991b1b', label: 'Relieving Letter' };
      case 'payslip':
        return { bg: '#fef3c7', color: '#92400e', label: 'Salary Payslip' };
      default:
        return { bg: '#f1f5f9', color: '#334155', label: 'HR Document' };
    }
  };

  const badge = getTypeBadgeColor();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !sending) onClose();
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#60a5fa',
              }}
            >
              ✉
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                {isAlreadySent ? 'Resend Document Email' : 'Send Document Email'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                Official email dispatch with PDF attachment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={sending}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '20px',
              cursor: sending ? 'not-allowed' : 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Document Summary Card */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: badge.bg,
                  color: badge.color,
                }}
              >
                {badge.label}
              </span>
              {isAlreadySent && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  ✓ Previously Delivered {emailSentAt ? `(${new Date(emailSentAt).toLocaleDateString()})` : ''}
                </span>
              )}
              {isFailed && (
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#dc2626' }}>
                  ⚠ Last Attempt Failed
                </span>
              )}
            </div>

            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              {title}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Attached File: <strong style={{ color: '#334155' }}>PDF Document</strong>
            </div>
          </div>

          {/* Recipient Details */}
          <div
            style={{
              background: hasNoEmail ? '#fef2f2' : '#f0fdf4',
              border: `1px solid ${hasNoEmail ? '#fecaca' : '#bbf7d0'}`,
              borderRadius: '12px',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: hasNoEmail ? '#991b1b' : '#166534', marginBottom: '6px' }}>
              Recipient Information
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Employee:</span>
              <strong style={{ color: '#0f172a' }}>
                {recipientName} {empId ? `(${empId})` : ''}
              </strong>

              <span style={{ color: '#64748b', fontWeight: 500 }}>Email Address:</span>
              {hasNoEmail ? (
                <strong style={{ color: '#dc2626' }}>
                  ⚠ No registered email found! Update employee profile first.
                </strong>
              ) : (
                <strong style={{ color: '#15803d', wordBreak: 'break-all' }}>
                  ✉ {recipientEmail}
                </strong>
              )}

              <span style={{ color: '#64748b', fontWeight: 500 }}>Sender:</span>
              <span style={{ color: '#475569' }}>
                Official Company Mailbox (configured SMTP)
              </span>
            </div>
          </div>

          {/* Warning / Confirmation Notice */}
          <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
            {isAlreadySent ? (
              <span>
                <strong>Note:</strong> This document was already sent to the employee. Confirming will intentionally resend the document.
              </span>
            ) : (
              <span>
                <strong>Confirmation:</strong> The official document PDF will be generated and attached to an email dispatched directly to the employee's registered inbox.
              </span>
            )}
          </div>

          {/* Error Message if any */}
          {(error || emailError) && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
              }}
            >
              <strong>Error:</strong> {error || emailError}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmSend}
            disabled={sending || hasNoEmail}
            style={{
              padding: '9px 22px',
              borderRadius: '8px',
              border: 'none',
              background: hasNoEmail
                ? '#cbd5e1'
                : isAlreadySent
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: (sending || hasNoEmail) ? 'not-allowed' : 'pointer',
              boxShadow: hasNoEmail ? 'none' : '0 4px 6px -1px rgba(37, 99, 235, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s',
            }}
          >
            {sending ? (
              <>
                <span
                  style={{
                    display: 'inline-block',
                    width: '14px',
                    height: '14px',
                    border: '2px solid #ffffff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                Sending Email...
              </>
            ) : isAlreadySent ? (
              <>↻ Confirm Resend</>
            ) : (
              <>✉ Confirm & Send Email</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendDocumentEmailModal;
