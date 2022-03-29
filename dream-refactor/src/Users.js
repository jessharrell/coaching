import './App.css';
import React from 'react';
import UserRow from "./UserRow";


function Users(props) {
    return (
        <div className="Users-section">
            { props.users.map(u => <UserRow className="User-row"
                                            fullName={u.firstName + " " + u.lastName}
                                            userName={u.firstName[0] + u.lastName}
                                            joinDate={u.joinDate}
                                            key={u.firstName+u.lastName} />) }
        </div>
    )
}
export default Users;
