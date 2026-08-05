import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesRegistration = () => {
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

    const rawHTML = `<style>
        body {
            font-family: Arial;
            background: #f5f7fa;
            padding: 20px;
        }

        .container {
            max-width: 500px;
            margin: auto;
            background: #fff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        input, select, textarea {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            margin-bottom: 15px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        button {
            width: 100%;
            padding: 12px;
            background: #092A49;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background: #0b3a66;
        }

        h2 {
            text-align: center;
        }

        .amount-box {
            background: #f0f8ff;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
        }
    </style>

<div class="container">
<h2>Internship Registration</h2>
<form action="" method="POST">
<input name="plan" type="hidden" value=""/>
<input id="total_amount" name="amount" type="hidden" value=""/>
<label>Full Name</label>
<input name="name" required="" type="text"/>
<label>Phone Number</label>
<input name="phone" required="" type="text"/>
<label>Email</label>
<input name="email" required="" type="email"/>
<label>Course</label>
<select name="course" required="">
<option value="">Select Course</option>
<option>Python</option>
<option>Java</option>
<option>Testing</option>
<option>AWS</option>
<option>Digital Marketing</option>
</select>
<label>Address</label>
<textarea name="address"></textarea>
<h4>Select Payment Type</h4>
<input checked="" name="payment_type" onclick="toggleEMI(); updateAmount()" type="radio" value="full"/> Full Payment<br/>
<input name="payment_type" onclick="toggleEMI(); updateAmount()" type="radio" value="emi"/> EMI<br/><br/>
<!-- EMI Section -->
<div id="emi_section" style="display:none;">
<label>Select Installment</label>
<select id="emi_part" name="emi_part" onchange="updateAmount()">
<option value="">Select Installment</option>
<option value="1">1st Installment</option>
<option value="2">2nd Installment</option>
<option value="3">3rd Installment</option>
</select>
</div>
<!-- Amount Display -->
<div class="amount-box">
<p><strong>Total Amount:</strong> ₹</p>
<p id="pay_amount"><strong>Payable:</strong> ₹</p>
</div>
<button type="submit">Proceed to Pay</button>
</form>
</div>
<script>
function toggleEMI() {
    let emiSection = document.getElementById("emi_section");
    let emiSelect = document.getElementById("emi_part");
    let selected = document.querySelector('input[name="payment_type"]:checked').value;

    if (selected === "emi") {
        emiSection.style.display = "block";
        emiSelect.required = true;
    } else {
        emiSection.style.display = "none";
        emiSelect.required = false;
        emiSelect.value = "";
    }
}

function updateAmount() {
    let total = parseInt(document.getElementById("total_amount").value);
    let selected = document.querySelector('input[name="payment_type"]:checked').value;
    let emiPart = document.getElementById("emi_part").value;

    let pay = total;

    if (selected === "emi") {
        let firstTwo = Math.floor(total * 0.3);

        if (emiPart == "1" || emiPart == "2") {
            pay = firstTwo;
        } else if (emiPart == "3") {
            pay = total - (firstTwo * 2);
        } else {
            pay = 0;
        }
    }

    document.getElementById("pay_amount").innerHTML = "<strong>Payable:</strong> ₹" + pay;
}

// Initial load
updateAmount();
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesRegistration;
