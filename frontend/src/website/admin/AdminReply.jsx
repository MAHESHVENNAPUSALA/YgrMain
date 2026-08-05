import React from 'react';
import { Link } from 'react-router-dom';

const AdminReply = () => {
    return (
        <>
            {/* Converted from Django Template */}
            <h2>Admin Reply - Ticket </h2>
<p>Status: </p>

<h3>Conversation</h3>
<ul>

    <li><strong>:</strong>  <small>()</small></li>

    <li>No messages yet</li>

</ul>

<h3>Reply as Admin</h3>
<form method="post">
    
    
    <button type="submit">Reply</button>
</form>

<p><a href="">Back to Tickets</a></p>

        </>
    );
};

export default AdminReply;
