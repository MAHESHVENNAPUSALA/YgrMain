import React from 'react';
import { Link } from 'react-router-dom';

const Tree = () => {
    return (
        <>
            {/* Converted from Django Template */}
            

<h1>RR Group – Growth Tree</h1>

<div className="wrapper">
    

<div id="yearContent"></div>
<svg viewBox="0 0 900 650" width="100%" height="800px">

    
    <path d="M450 560 L450 300" className="branch" style=/>

    
    <path d="M450 360 C300 280, 200 240, 150 220" className="branch" style=/>
    <path d="M450 320 C320 290, 260 300, 220 320" className="branch" style=/>
    <path d="M450 320 C580 290, 640 300, 680 320" className="branch" style=/>
    <path d="M450 360 C600 280, 700 240, 750 220" className="branch" style=/>

    
    <g className="node" onclick="showYear(2023)">
        <circle cx="150" cy="220" r="36" fill="var(--y2023)" style=/>
        <text x="150" y="214"2023</text>
        <text x="150" y="230" className="sub"RR Gobal</text>
    </g>

    
    <g className="node" onclick="showYear(2024)">
        <circle cx="220" cy="320" r="36" fill="var(--y2024)" style=/>
        <text x="220" y="314"2024</text>
        <text x="220" y="330" className="sub"YGR Gobal IT</text>
    </g>

    
    <g className="node" onclick="showYear(2025)">
        <circle cx="680" cy="320" r="36" fill="var(--y2025)" style=/>
        <text x="680" y="314"2025</text>
        <text x="680" y="330" className="sub"RR Talks</text>
    </g>

    
    <g className="node" onclick="showYear(2026)">
        <circle cx="750" cy="220" r="36" fill="var(--y2026)" style=/>
        <text x="750" y="214"2026</text>
        <text x="750" y="230" className="sub"UpgradU & News</text>
    </g>

    
    <text x="450" y="610" text-anchor="middle"
          font-size="18" font-weight="bold" fill="#1f2933">
        RR Group
    </text>

</svg>

</div>

<script dangerouslySetInnerHTML={{ __html: `
const data = {
    2023: \`<h3>YGR Gobal Services</h3>
           <p>Started as overseas consultancy helping Indian students with gobal education and later growing into a software company in KPHB Hyderabad. Content can be long and scrollable if needed.</p>\`,

    2024: \`<h3>YGR Gobal IT Services Pvt Ltd</h3>
           <p>Expanded into Web, Mobile Apps, Digital Marketing, UI/UX, Testing, IT Support, and Internship programs for startups and enterprises. The content area adjusts height but remains close to the tree.</p>\`,

    2025: \`<h3>IT Trainings & Co-Working Spaces</h3>
           <p>Providing full stack training, workshops, and collaborative co-working spaces for startups and freelancers. This text can overflow and scroll inside the content box.</p>\`,

    2026: \`<h3>Expansion & Innovation</h3>
           <p>Building the Upgrade U App for productivity, analytics, operations, and collaboration. You can click any leaf to view details immediately below the tree with minimal gap.</p>\`
};

function showYear(year) {
    const box = document.getElementById("yearContent");
    box.style.display = "block";
    box.innerHTML = data[year];
    box.scrollIntoView({behavior:"smooth", block:"start"});
}
` }} />


        </>
    );
};

export default Tree;
