import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesSutdashboard = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    useEffect(() => {
        // Intercept link clicks for React Router
        const handleLinkClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                navigate(target.getAttribute('href'));
            }
        };
        document.addEventListener('click', handleLinkClick);
        
        // Re-run scripts
        if (containerRef.current) {
            const scripts = containerRef.current.querySelectorAll('script');
            scripts.forEach(oldScript => {
                if (oldScript.dataset.executed) return;
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                if (oldScript.innerHTML) newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
                newScript.dataset.executed = "true";
            });
        }

        return () => document.removeEventListener('click', handleLinkClick);
    }, [navigate]);

    const rawHTML = `<h2>Student Dashboard</h2>
<p>Total Course Fee: ₹</p>
<p>Paid: ₹</p>
<p>Remaining: ₹</p>
<!-- ✅ Progress Bar -->
<div style="width: 300px; background: #ddd;">
<div style="width: %; background: green; color:white;">
        %
    </div>
</div>
<br/>
<p>EMI Progress:  / </p>
<hr/>
<h3>Payments</h3>
<table border="1">
<tr>
<th>EMI</th>
<th>Amount</th>
<th>Status</th>
<th>Invoice</th>
</tr>
<tr>
<td></td>
<td>₹</td>
<td>
        
            Paid
        
            Pending
        
    </td>
<td>
<a href="/invoice//">Download</a>
</td>
</tr>
</table>`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesSutdashboard;
