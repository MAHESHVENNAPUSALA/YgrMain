// Support DOMContentLoaded listeners in dynamically injected scripts (dangerouslySetInnerHTML)
const originalAddEventListener = document.addEventListener;
document.addEventListener = function (type, listener, options) {
  if (type === 'DOMContentLoaded' && (document.readyState === 'complete' || document.readyState === 'interactive')) {
    setTimeout(listener, 0);
  } else {
    originalAddEventListener.call(document, type, listener, options);
  }
};


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './shared/context/ThemeContext'
import { ToastProvider } from './shared/context/ToastContext'
import { DialogProvider } from './shared/context/DialogContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <DialogProvider>
          <App />
        </DialogProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
