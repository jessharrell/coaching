import './App.css';
import React from 'react';

function UserRow(props) {
    return (
        <div className="Flex-row">
            <p className="Flex-row-column">{props.fullName}</p>
            <p className="Flex-row-column">{props.userName}</p>
            <p className="Flex-row-column">{props.joinDate}</p>
            {props.managing && <button className="Flex-row-column" onClick={props.approvalAction}>{props.approvalActionType}</button>}
        </div>
    )
}

export default UserRow;
