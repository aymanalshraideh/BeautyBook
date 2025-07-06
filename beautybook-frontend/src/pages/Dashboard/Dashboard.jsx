import React from 'react';

function Dashboard() {
  const handleLogout = () => {
  
    window.location.href = '/login';
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to BeautyBook Dashboard 👋</h1>
      <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
    </div>
  );
}

export default Dashboard;
