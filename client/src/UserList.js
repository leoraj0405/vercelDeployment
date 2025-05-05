import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_URL}/user`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    console.log(users)

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <nav style={{ 
                    display: 'flex', 
                    gap: '10px',
                    justifyContent: 'center'
                }}>
                    <Link
                        className='btn btn-primary'
                        to="/">User List</Link>
                    <Link
                        className='btn btn-primary'
                        to="/add">Add User</Link>
                </nav>
                <h1 className="display-4">User Directory</h1>
                <p className="text-muted">This page lists all registered users with their Email address.</p>
            </div>

            <div className="d-flex justify-content-center">
                <table className="table table-bordered table-hover w-75 shadow-sm bg-white">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center text-secondary">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
