import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesA = () => {
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

    const rawHTML = `<link href="/images/logo.png" rel="icon" type="image/png"/>
<style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 20px;
      }

      .form-container {
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        margin: 30px auto;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      }

      h2 {
        text-align: center;
        color: #092a49;
        margin-bottom: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      label {
        font-weight: bold;
      }

      .required {
        color: red;
      }

      input[type="text"],
      input[type="email"],
      input[type="number"],
      input[type="file"] {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 100%;
        box-sizing: border-box;
      }

      input[type="submit"] {
        background-color: #092a49;
        color: white;
        padding: 12px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
      }

      input[type="submit"]:hover {
        background-color: #06426b;
      }

      .logo {
        display: block;
        margin: 0 auto 20px auto;
        width: 120px;
        height: auto;
      }

      /* Already registered message */
      .already-registered {
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
        color: #555;
      }

      .already-registered a {
        color: #092a49;
        text-decoration: none;
        font-weight: bold;
        margin-left: 5px;
      }

      .already-registered a:hover {
        text-decoration: underline;
      }

      @media screen and (max-width: 600px) {
        body {
          padding: 10px;
        }

        .form-container {
          padding: 20px;
          margin: 10px auto;
        }

        input[type="submit"] {
          font-size: 14px;
          padding: 10px;
        }
      }
    </style>

<div class="form-container">
<!-- Logo -->
<img alt="logo" class="logo" src="/image/logo.jpg"/>
<h2>Register for Internship</h2>
<p><strong>Selected Course:</strong> </p>
<form enctype="multipart/form-data" id="registerForm" method="POST" onsubmit="startPayment();">
<label>Name <span class="required">*</span></label>
<input name="name" required="" type="text"/>
<label>Email <span class="required">*</span></label>
<input name="email" required="" type="email"/>
<label>Phone <span class="required">*</span></label>
<input name="phone" type="number"/>
<label>WhatsApp Number</label>
<input name="wphone" type="number"/>
<label>College Name <span class="required">*</span></label>
<input name="clg_name" required="" type="text"/>
<label>College Address</label>
<input name="clg_address" type="text"/>
<label>Roll Number <span class="required">*</span></label>
<input name="roll_no" required="" type="text"/>
<label>Branch</label>
<input name="branch" type="text"/>
<label>Upload Photo</label>
<input accept="image/*" name="photo" type="file"/>
<label>Upload Resume <span class="required">*</span></label>
<input name="resume" required="" type="file"/>
<button onclick="startPayment()" style="
            background-color: #092a49;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
          " type="submit">
          Pay ₹299 &amp; Register
        </button>
</form>
<!-- Already registered message -->
<!-- Already registered link -->
<div class="already-registered" style="text-align: center; margin-top: 15px; font-size: 15px">
        Already registered? <a href="">Login</a>
</div>
</div>
<script>
      function startPayment() {
       
        const form = document.getElementById("registerForm");
        const formData = new FormData(form);
        const courseId = ;
        fetch(\`/register/\${courseId}/\`, {
          method: "POST",
          body: formData,
          headers: {
            "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Register failed");
            return res.json();
          })
          .then(() => {
            return fetch("/api/create-order/", { method: "POST" });
          })
          .then((res) => {
            if (!res.ok) throw new Error("Order creation failed");
            return res.json();
          })
          .then((order) => {
            const options = {
              key: order.key,
              amount: order.amount,
              currency: "INR",
              order_id: order.order_id,
              name: "Internship Registration",

              prefill: {
                name: formData.get("name"),
                email: formData.get("email"),
                contact: formData.get("phone"),
              },

              handler: function (response) {
                fetch("/api/verify-payment/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(response),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    if (result.status === "success") {
                      alert("Payment Successful!");
                      window.location.href = "/login/";
                    } else {
                      alert("Payment verification failed");
                    }
                  });
              },

              modal: {
                ondismiss: function () {
                  fetch("/api/delete-pending-user/", { method: "POST" });
                  alert("Payment cancelled. Registration removed.");
                },
              },
            };

            new Razorpay(options).open();
          })
          .catch((err) => {
            alert(err.message);
            console.error(err);
          });
      }

      setInterval((e) => {
        e.preventDefault()
        fetch("/api/payment-status/")
          .then((res) => res.json())
          .then((data) => {
            if (data.paid) {
              window.location.href = "/home/";
            }
          });
      }, 3000);
    </script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesA;
