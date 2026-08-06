import React, { useState } from 'react';

const ClientForm = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const getCookie = (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    cookie = cookie.trim();
                    if (cookie.startsWith(name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };

        try {
            // Post to the original Django backend endpoint
            const response = await fetch('/client_form/', {
                method: 'POST',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: formData,
            });
            setStatus("Your details have been successfully submitted!");
            e.target.reset();
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        outline: 'none',
        fontSize: '16px',
        background: '#fff',
        color: '#334155'
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #fbcc27, #eab308)',
        color: '#091c47',
        fontWeight: '800',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 120px)', paddingTop: 'calc(var(--navbar-height, 116px) + 28px)', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f8fafc, #edf2f7)' }}>
            <div style={{ width: '350px', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#091c47', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', letterSpacing: '1px' }}>Client Form</h2>
                
                {status && (
                    <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '14px', border: '1px solid #c3e6cb' }}>
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" required style={inputStyle} />
                    <input type="text" name="phone" placeholder="Phone Number" required style={inputStyle} />
                    <input type="email" name="email" placeholder="Email" required style={inputStyle} />
                    <select name="service" required style={inputStyle} defaultValue="">
                        <option value="" disabled>Select Service</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Web Apps">Web Apps</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="Marketing">Marketing</option>
                        <option value="UI / UX">UI / UX</option>
                        <option value="Testing">Testing</option>
                        <option value="Support">Support</option>
                        <option value="Internships">Internships</option>
                    </select>

                    <button type="submit" style={buttonStyle}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 5px 15px rgba(251, 204, 39, 0.4)';
                            e.target.style.background = 'linear-gradient(135deg, #eab308, #ca8a04)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'none';
                            e.target.style.boxShadow = 'none';
                            e.target.style.background = 'linear-gradient(135deg, #fbcc27, #eab308)';
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;
