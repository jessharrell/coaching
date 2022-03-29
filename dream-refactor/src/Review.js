import './App.css';
import React, {useState} from 'react';
import UserRow from "./UserRow";

function Review(props) {
    const [approvalItems, setApprovalItems] = useState([]);

    React.useEffect(() => {
        const fetchApprovals = async () => {
            const res = await fetch('http://localhost:3003/approvals')
            const json = await res.json();
            setApprovalItems(json.approvals);
        };
        fetchApprovals();
    }, [setApprovalItems]);

    function deleteUser(user){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: user, override: true})
        };
        fetch('http://localhost:3003/deleteUser', requestOptions);
    }

    function addUser(user){
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
