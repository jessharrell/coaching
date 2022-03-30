import './App.css';
import React, {MouseEventHandler, useState} from 'react';
import UserRow from "./UserRow";

type ReviewProps = {
    hide: MouseEventHandler;
}

type User = {
    firstName: string;
    lastName: string;
    joinDate: string;
}

type ApprovalItem ={
    user: User;
    type: string;
}

function Review(props: ReviewProps) {
    const [approvalItems, setApprovalItems] = useState<ApprovalItem[]>([]);

    React.useEffect(() => {
        const fetchApprovals = async () => {
            const res = await fetch('http://localhost:3003/approvals')
            const json = await res.json();
            setApprovalItems(json.approvals);
        };
        fetchApprovals();
    }, [setApprovalItems]);

    function deleteUser(user: User){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: user, override: true})
        };
        fetch('http://localhost:3003/deleteUser', requestOptions);
    }

    function addUser(user: User){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: user, override: true})
        };
        fetch('http://localhost:3003/addUser', requestOptions);
    }

    return (
        <div className="Review-section">
          <div className="Title-bar">
              <p>Please Review</p>
              <button onClick={props.hide}>X</button>
          </div>
          {approvalItems.map(a => {
              if(a.type === "add") {
                  return (<UserRow className="Approval-row"
                                   fullName={a.user.firstName + " " + a.user.lastName}
                                   userName={a.user.firstName[0] + a.user.lastName}
                                   joinDate={a.user.joinDate}
                                   managing={true}
                                   approvalActionType={a.type.toUpperCase()}
                                   approvalAction={() => {addUser(a.user)}}/>)
              } else {
                  return (<UserRow className="Approval-row"
                                   fullName={a.user.firstName + " " + a.user.lastName}
                                   userName={a.user.firstName[0] + a.user.lastName}
                                   joinDate={a.user.joinDate}
                                   managing={true}
                                   approvalActionType={a.type.toUpperCase()}
                                   approvalAction={() => {deleteUser(a.user)}}/>)
              }
          })}
        </div>
    )
}

export default Review;
