import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBuyer() {
  const { buyerId } = useParams();
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    preferredPropertyType: '',
  });

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const response = await axios.get(`/api/buyers/${buyerId}`);
        setBuyer(response.data.buyer);
      } catch (error) {
        console.error('Failed to fetch buyer:', error);
      }
    };
    fetchBuyer();
  }, [buyerId]);

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/buyers/${buyerId}`, buyer);
      navigate('/admin');
    } catch (error) {
      console.error('Failed to update buyer:', error);
    }
  };

  return (
    <div>
      <h1>Edit Buyer</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={buyer.firstName} onChange={handleChange} placeholder="First Name" />
        <input type="text" name="lastName" value={buyer.lastName} onChange={handleChange} placeholder="Last Name" />
        <input type="email" name="email" value={buyer.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={buyer.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="streetAddress" value={buyer.streetAddress} onChange={handleChange} placeholder="Street Address" />
        <input type="text" name="city" value={buyer.city} onChange={handleChange} placeholder="City" />
        <input type="text" name="state" value={buyer.state} onChange={handleChange} placeholder="State" />
        <input type="text" name="zipCode" value={buyer.zipCode} onChange={handleChange} placeholder="Zip Code" />
        <input type="text" name="preferredPropertyType" value={buyer.preferredPropertyType} onChange={handleChange} placeholder="Preferred Property Type" />
        <button type="submit">Update Buyer</button>
      </form>
    </div>
  );
}

export default EditBuyer;
