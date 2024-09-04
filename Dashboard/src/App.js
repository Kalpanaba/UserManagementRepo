// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Modal from './components/Modal';
import { fetchUsers, addUser, editUser, deleteUser } from './services/api';
import './styles/App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsers(page).then(({ users: newUsers, total }) => {
      setUsers(newUsers);
      setTotalPages(Math.ceil(total / 3)); // Assuming 3 users per page
      setLoading(false);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, [page]);

  
  const handleAddUser = () => {
    
    setSelectedUser(null); // Make sure this is null
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleSaveUser = (user) => {
    if (selectedUser) {
      editUser(user).then(() => {
        setUsers(users.map(u => (u.id === user.id ? user : u)));
        setIsModalOpen(false);
      }).catch(error => console.error(error));
    } else {
      addUser(user).then(newUser => {
        setUsers([...users, newUser]);
        setIsModalOpen(false);
      }).catch(error => console.error(error));
    }
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter(user => user.id !== id));
    }).catch(error => console.error(error));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="App">
      <Header title="User Management Dashboard" />
      <div className="button-container">
        <button className="add-user-button" onClick={handleAddUser}>Add New User</button>
      </div>
      <UserList
        users={users}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      {loading && <div className="loading">Loading...</div>}
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>&lt;</button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>&gt;</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UserForm
          user={selectedUser || {}} // Pass an empty object if selectedUser is null
          onSave={handleSaveUser}
          isViewMode={isViewMode}
        />
      </Modal>
    </div>
  );
}

export default App;
