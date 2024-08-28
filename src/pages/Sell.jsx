import React, { useState } from 'react';
import axios from 'axios';
import "../css/Sell.css";

function Sell() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    waterShare: false,
    waterCompanyName: '',
    waterAmount: '',  // New field for water amount
    waterRight: false,
    waterRightNumber: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sellers', formData);
      console.log('Seller created successfully:', response.data);
      setSubmissionStatus('Seller created successfully!');
    } catch (error) {
      console.error('Error creating seller:', error.response?.data || error.message);
      setSubmissionStatus('Error creating seller. Please try again.');
    }
  };

  return (
    <div className="sell-page-wrapper">
      <div className="sell-container">
        <h2 className="form-title">Sell Your Property</h2>
        <form className="sell-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="waterShare"
                checked={formData.waterShare}
                onChange={handleChange}
              />
              Water Share
            </label>
          </div>
          <div className="form-group">
            <label>Water Company Name</label>
            <input
              type="text"
              name="waterCompanyName"
              value={formData.waterCompanyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Water Amount</label>
            <input
              type="number"  // Input type set to number for water amount
              name="waterAmount"
              value={formData.waterAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="waterRight"
                checked={formData.waterRight}
                onChange={handleChange}
              />
              Water Right
            </label>
          </div>
          <div className="form-group">
            <label>Water Right Number</label>
            <input
              type="text"
              name="waterRightNumber"
              value={formData.waterRightNumber}
              onChange={handleChange}
            />
          </div>
          <button className="submit-btn" type="submit">Submit</button>
        </form>
        {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
      </div>
    </div>
  );
}

export default Sell;
