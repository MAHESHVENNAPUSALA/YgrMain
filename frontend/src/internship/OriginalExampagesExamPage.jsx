import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesExamPage = () => {
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
            margin: 0;
            display: flex;
            background: #f4f4f4;
        }

        /* LEFT CARD */
        .sidebar {
            width: 260px;
            background: #ffffff;
            padding: 20px;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            height: 100vh;
        }

        .sidebar h3 {
            margin-bottom: 15px;
            font-size: 22px;
        }

        .sidebar button {
            width: 100%;
            padding: 12px;
            margin-bottom: 10px;
            font-size: 18px;
            cursor: pointer;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
        }

        .sidebar button:hover {
            background: #0056b3;
        }

        /* MAIN CONTENT */
        .content {
            flex: 1;
            padding: 30px;
        }

        h2 {
            font-size: 28px;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        .question {
            background: white;
            padding: 25px;
            border-radius: 8px;
            font-size: 22px;
            display: none;
        }

        label {
            font-size: 20px;
            display: block;
            margin: 10px 0;
            cursor: pointer;
        }

        .nav-buttons {
            margin-top: 20px;
        }

        .nav-buttons button {
            padding: 10px 20px;
            font-size: 18px;
            margin-right: 10px;
            cursor: pointer;
        }
    </style>

 LEFT SIDE CARD 
<div class="sidebar">
<h3>Sections</h3>
<button onclick="loadSection(0)">Attitude</button>
<button onclick="loadSection(20)">Reasoning</button>
<button onclick="loadSection(40)">Technical</button>
</div>
 MAIN CONTENT 
<div class="content">
<h2>Questions</h2>
<ul>
<li>
<img alt="" height="60" src="" width="60"/>
<img alt="Default User" height="60" src="/default_user.png" width="60"/>
</li>
<li>No users found.</li>
</ul>
<ul id="questionList">
<li class="question">
<strong>. </strong><br/><br/>
<label>
<input name="question_" type="radio"/>
                A. 
            </label>
<label>
<input name="question_" type="radio"/>
                B. 
            </label>
<label>
<input name="question_" type="radio"/>
                C. 
            </label>
<label>
<input name="question_" type="radio"/>
                D. 
            </label>
</li>
</ul>
<div class="nav-buttons">
<button onclick="prevQuestion()">Previous</button>
<button onclick="nextQuestion()">Next</button>
</div>
</div>
<script>
    const questions = document.querySelectorAll('.question');
    let currentIndex = 0;
    let startIndex = 0;
    let endIndex = 20;

    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.style.display = (i === index && i >= startIndex && i < endIndex)
                ? 'block'
                : 'none';
        });
    }

    function loadSection(start) {
        startIndex = start;
        endIndex = start + 20;
        currentIndex = startIndex;
        showQuestion(currentIndex);
    }

    function nextQuestion() {
        if (currentIndex < endIndex - 1) {
            currentIndex++;
            showQuestion(currentIndex);
        }
    }

    function prevQuestion() {
        if (currentIndex > startIndex) {
            currentIndex--;
            showQuestion(currentIndex);
        }
    }

    // Load Attitude by default
    loadSection(0);
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesExamPage;
