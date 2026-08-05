import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesCreateQuestionPage = () => {
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

    const rawHTML = `


Create Question Paper
Create Question Paper



<style>
/* ---------- CONTAINER ---------- */
.question-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 30px 0;
}

.container {
    background: #fff;
    width: 520px;
    max-width: 95%;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

/* ---------- TITLE ---------- */
.container h2 {
    color: #0a2540;
    margin-bottom: 25px;
    font-size: 24px;
    text-align: center;
    font-weight: 700;
}

/* ---------- FORM ---------- */
label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #333;
    font-size: 14px;
}

input,
textarea,
select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    margin-bottom: 15px;
    transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
    border-color: #1f3c88;
    outline: none;
}

textarea {
    resize: none;
    height: 80px;
}

/* ---------- BUTTONS ---------- */
.form-actions {
    text-align: center;
    margin-top: 10px;
}

button,
.view-btn {
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: #fff;
    border: none;
    padding: 10px 22px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    margin: 6px;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover,
.view-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,123,255,0.35);
    color: #fff;
}

/* ---------- MESSAGE ---------- */
.message {
    margin-top: 15px;
    font-weight: 600;
    text-align: center;
}

/* ---------- MOBILE ---------- */
@media (max-width: 600px) {
    .container {
        padding: 25px 20px;
    }

    .container h2 {
        font-size: 20px;
    }
}
</style>
<div class="question-wrapper">
<div class="container">
<h2>Create Question Paper</h2>
<form id="questionForm">
<label for="language">Select Topic</label>
<select id="language" name="language" required="">
<option value="">-- Select Topic --</option>
<option value="aptitude">Aptitude</option>
<option value="reasoning">Reasoning</option>
<option value="technical">Technical</option>
<option value="python">Python</option>
<option value="base_test">Base Test</option>
<option value="java">Java</option>
<option value="digital_marketing">Digital Marketing</option>
</select>
<label for="question">Question</label>
<textarea id="question" name="question" placeholder="Enter the question..." required=""></textarea>
<label for="optionA">Option A</label>
<input id="optionA" name="optionA" required="" type="text"/>
<label for="optionB">Option B</label>
<input id="optionB" name="optionB" required="" type="text"/>
<label for="optionC">Option C</label>
<input id="optionC" name="optionC" required="" type="text"/>
<label for="optionD">Option D</label>
<input id="optionD" name="optionD" required="" type="text"/>
<label for="correct">Correct Answer (A/B/C/D)</label>
<input id="correct" maxlength="1" name="correct" pattern="[ABCDabcd]" required="" title="Enter A, B, C, or D only" type="text"/>
<div class="form-actions">
<button type="submit">Save Question</button>
<a class="view-btn" href="">
                    View Saved Questions
                </a>
</div>
</form>
<div class="message" id="msg"></div>
</div>
</div>
<script>
const form = document.getElementById("questionForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const questionData = {
        language: form.language.value,
        question: form.question.value.trim(),
        optionA: form.optionA.value.trim(),
        optionB: form.optionB.value.trim(),
        optionC: form.optionC.value.trim(),
        optionD: form.optionD.value.trim(),
        correct: form.correct.value.trim().toUpperCase(),
    };

    fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: JSON.stringify(questionData),
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            msg.textContent = "✅ Question saved successfully!";
            msg.style.color = "green";
            form.reset();
        } else {
            msg.textContent = "❌ " + data.message;
            msg.style.color = "red";
        }
        setTimeout(() => msg.textContent = "", 2500);
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesCreateQuestionPage;
