import './App.css';
import React, {MouseEventHandler} from 'react';

type UserProps = {
    className: string;
    fullName: string;
    userName: string;
    joinDate: string;
    managing: boolean;
    approvalAction: MouseEventHandler;
    approvalActionType: string;
}

function UserRow(props: UserProps) {
    return (
        <div className={props.className + " Flex-row"}>
            <p className="Flex-row-column">{props.fullName}</p>
            <p className="Flex-row-column">{props.userName}</p>
            <p className="Flex-row-column">{props.joinDate}</p>
            {props.managing && <button className="Flex-row-column" onClick={props.approvalAction}>{props.approvalActionType}</button>}
        </div>
    )
}

export default UserRow;
