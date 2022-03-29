import './App.css';
import React from 'react';
import Review from './Review'
import Users from './Users'
import Spinner from 'react-bootstrap/Spinner';

function App() {
    const [showAdd, setShowAdd] = React.useState(false);
    const [showReview, setShowReview] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    const fetchUsers = async () => {
        setIsLoading(true);
        fetch(
            'http://localhost:3003/users',
        ).then (res => {
           return res.json();
        }).then(json => {
            setUsers(json.users);
            setIsLoading(false)
        });
    };

    function saveAndClose(event) {
        const [firstName, lastName] = event.target.name.value.split(" ");
        let date;
        if (!event.target.date.value) {
            let today = new Date();
            date = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();
        } else {
            date = event.target.date.value;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: { firstName: firstName, lastName: lastName, joinDate: date },
                override: false })
        };
        fetch('http://localhost:3003/addUser', requestOptions);
    }

    return (
      <div className="App">
        <div className="App-header">
          <p>
            Refactor Dreams and Testing Nightmares
          </p>
        </div>
        <div className="Button-row">
            <button id="UsersButton" className="Button-row-button" onClick={fetchUsers}>Manage Users</button>
            <button className="Button-row-button" onClick={() => setShowReview(true)}>Review Requests</button>
            <button className="Button-row-button" onClick={() => setShowAdd(true)}>Add User</button>
        </div>
          {isLoading && <Spinner animation="border" />}
          <Users users={users}/>
          {showAdd &&
               <div>
                   <div>
                       <form onSubmit={saveAndClose}>
                           <label>
                               Full Name:
                               <input type="text" name="name" />
                           </label>
                           <label>
                               Join Date:
                               <input type="text" name="date" />
                           </label>
                           <input type="submit" value="Save" />
                           <button onClick={() => setShowAdd(false)}>Cancel</button>
                       </form>
                   </div>
               </div>
          }
          {showReview && <Review hide={() => setShowReview(false)}/>}
      </div>
            );
}

export default App;
