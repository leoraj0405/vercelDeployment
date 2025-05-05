import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddUser() {
    const [form, setForm] = useState({ name: '', email: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        console.log(form)
        try {
            const res = await fetch(`${process.env.REACT_APP_FETCH_URL}/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                alert('User added successfully!');
                setForm({ name: '', email: '' });
            } else {
                const data = await res.json();
                setError(data.message || 'Error adding user');
            }
        } catch (err) {
            console.log(err)
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4">Add New User</h1>
                <p className="text-muted">Fill the form below to add a new user to the directory.</p>
            </div>

            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit} className="w-50 shadow p-4 bg-white rounded">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="name">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter user name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <hr />
                    <div 
                    className='d-flex justify-content-center'
                    style={{gap: '10px'}}>

                    <Link 
                    to='/'
                    className="btn btn-warning btn-block">
                        Back
                    </Link>

                    <button type="submit" className="btn btn-primary btn-block">
                        Add User
                    </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddUser;
