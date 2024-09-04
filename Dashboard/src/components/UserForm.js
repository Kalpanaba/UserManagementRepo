import React, { useState, useEffect } from 'react';
import '../styles/UserForm.css';

function UserForm({ user, onSave, isViewMode }) {
  const [formUser, setFormUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  useEffect(() => {
  
  
    if (user && user.id) { 
   
      setFormUser(user);
    } else {
      
    
      setFormUser({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isViewMode) {
      onSave(formUser);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{user && user.id ? (isViewMode ? 'View User' : 'Edit User') : 'Add User'}</h2>
      {isViewMode ? (
        <div className="view-mode">
          <div className="view-group">
            <span className="view-label">First Name:</span>
            <span className="view-value">{formUser.firstName}</span>
          </div>
          <div className="view-group">
            <span className="view-label">Last Name:</span>
            <span className="view-value">{formUser.lastName}</span>
          </div>
          <div className="view-group">
            <span className="view-label">Email:</span>
            <span className="view-value">{formUser.email}</span>
          </div>
          <div className="view-group">
            <span className="view-label">Department:</span>
            <span className="view-value">{formUser.department}</span>
          </div>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formUser.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formUser.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formUser.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              name="department"
              value={formUser.department}
              onChange={handleChange}
              placeholder="Department"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">
              {user && user.id ? (isViewMode ? 'View' : 'Save Changes') : 'Add User'}
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default UserForm;
