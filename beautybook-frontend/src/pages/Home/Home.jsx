import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Welcome to BeautyBook</h1>
        <p className="lead">
          BeautyBook is your go-to platform for managing appointments, services, and staff.
          Whether you're a customer, staff member, or admin, we provide you with the tools
          you need to manage all aspects of your beauty appointments.
        </p>

    

        <div className="my-4">
          <h2>What We Offer</h2>
          <p>
            BeautyBook offers a user-friendly interface for beauty salons and service providers to manage their appointments and services. Whether you're a customer scheduling a hair appointment or an admin managing the team, we have you covered.
          </p>
          <Link to="/" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
