import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesPayment1 = () => {
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

    const rawHTML = `<h2>Payment Summary</h2>
<p>Base Amount: ₹</p>
<p>GST (18%): ₹</p>
<p><strong>Total: ₹</strong></p>
<button id="pay-btn">Pay Now</button>
<form action="/payment-success//" id="success-form" method="POST">
<input name="razorpay_payment_id" type="hidden"/>
<input name="razorpay_order_id" type="hidden"/>
<input name="razorpay_signature" type="hidden"/>
</form>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
var options = {
    "key": "",
    "amount": "",
    "currency": "INR",
    "order_id": "",

    "handler": function (response){
        document.querySelector('[name="razorpay_payment_id"]').value = response.razorpay_payment_id;
        document.querySelector('[name="razorpay_order_id"]').value = response.razorpay_order_id;
        document.querySelector('[name="razorpay_signature"]').value = response.razorpay_signature;

        document.getElementById("success-form").submit();
    }
};

var rzp = new Razorpay(options);

document.getElementById('pay-btn').onclick = function(e){
    rzp.open();
    e.preventDefault();
}
</script>`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesPayment1;
