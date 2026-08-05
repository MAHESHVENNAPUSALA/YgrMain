import React, { createContext, useContext, useState, useRef } from 'react';

const DialogContext = createContext(null);

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'confirm', // 'confirm' or 'prompt'
    message: '',
    defaultValue: '',
    inputValue: '',
    resolveRef: null
  });

  const showConfirm = (message) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        type: 'confirm',
        message,
        defaultValue: '',
        inputValue: '',
        resolveRef: resolve
      });
    });
  };

  const showPrompt = (message, defaultValue = '') => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        type: 'prompt',
        message,
        defaultValue,
        inputValue: defaultValue,
        resolveRef: resolve
      });
    });
  };

  const handleClose = (value) => {
    if (dialogState.resolveRef) {
      dialogState.resolveRef(value);
    }
    setDialogState({
      isOpen: false,
      type: 'confirm',
      message: '',
      defaultValue: '',
      inputValue: '',
      resolveRef: null
    });
  };

  return (
    <DialogContext.Provider value={{ confirm: showConfirm, prompt: showPrompt }}>
      {children}
      {dialogState.isOpen && (
        <div className="attendance-modal-overlay">
          <div className="attendance-modal" style={{ maxWidth: '400px' }}>
            <div className="attendance-modal-header">
              <h3>{dialogState.type === 'confirm' ? 'Confirmation Required' : 'Input Needed'}</h3>
              <button className="attendance-modal-close" onClick={() => handleClose(null)}>
                &times;
              </button>
            </div>
            <div className="attendance-modal-body" style={{ padding: '20px' }}>
              <p style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {dialogState.message}
              </p>
              {dialogState.type === 'prompt' && (
                <input
                  type="text"
                  value={dialogState.inputValue}
                  onChange={(e) => setDialogState(prev => ({ ...prev, inputValue: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleClose(dialogState.inputValue);
                  }}
                />
              )}
            </div>
            <div className="attendance-modal-footer" style={{ padding: '12px 20px' }}>
              <button
                type="button"
                className="modal-btn modal-btn-secondary"
                onClick={() => handleClose(dialogState.type === 'confirm' ? false : null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn modal-btn-primary"
                style={{ background: dialogState.type === 'confirm' ? 'var(--accent-blue)' : 'var(--success)' }}
                onClick={() => handleClose(dialogState.type === 'confirm' ? true : dialogState.inputValue)}
              >
                {dialogState.type === 'confirm' ? 'Confirm' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
