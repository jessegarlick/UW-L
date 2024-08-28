import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EditSeller.css'; // Import your CSS file

function EditSeller() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState({
    type: 'water_share',
    waterCompanyName: '',
    waterRightNumber: '',
    acreFeet: '',
    location: '',
  });
  const [listingMessage, setListingMessage] = useState('');

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`/api/sellers/${sellerId}`);
        setSeller(response.data.seller);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch seller:', error);
        setError('Failed to load seller data.');
        setLoading(false);
      }
    };
    fetchSeller();
  }, [sellerId]);

  const handleSellerChange = (e) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const handleListingChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleListingTypeChange = (e) => {
    const type = e.target.value;
    setListing({
      ...listing,
      type,
      waterCompanyName: '',
      waterRightNumber: '',
      acreFeet: '',
      location: '',
    });
  };

  const handleSellerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/sellers/${sellerId}`, seller);
      navigate('/admin');
    } catch (error) {
      console.error('Failed to update seller:', error);
    }
  };

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/listings', {
        listingType: listing.type === 'water_share' ? 'Water Share' : 'Water Right',
        waterCompanyName: listing.waterCompanyName,
        waterRightNumber: listing.waterRightNumber,
        waterAmount: listing.acreFeet,
        location: listing.location,
        sellerId: parseInt(sellerId), // Ensure sellerId is correctly sent as a number
      });
      setListingMessage('Listing created successfully!');
      console.log('Listing created:', response.data);
    } catch (error) {
      console.error('Failed to create listing:', error);
      setListingMessage('Failed to create listing.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!seller) {
    return <div>Seller not found</div>;
  }

  return (
    <div className="edit-seller-container">
      <h1>Edit Seller</h1>
      <div className="forms-container">
        <form onSubmit={handleSellerSubmit} className="edit-seller-form">
          <h2>Seller Information</h2>
          {/* Seller Information Form */}
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={seller.firstName} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={seller.lastName} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={seller.email} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" name="phone" value={seller.phone} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>Street Address:</label>
            <input type="text" name="streetAddress" value={seller.streetAddress} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input type="text" name="city" value={seller.city} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input type="text" name="state" value={seller.state} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input type="text" name="zipCode" value={seller.zipCode} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>Water Company Name:</label>
            <input type="text" name="waterCompanyName" value={seller.waterCompanyName} onChange={handleSellerChange} />
          </div>
          <div className="form-group">
            <label>Water Right Number:</label>
            <input type="text" name="waterRightNumber" value={seller.waterRightNumber} onChange={handleSellerChange} />
          </div>
          <div className="form-group checkbox-group">
            <label>
              Water Share:
              <input type="checkbox" name="waterShare" checked={seller.waterShare} onChange={() => setSeller({ ...seller, waterShare: !seller.waterShare })} />
            </label>
          </div>
          <div className="form-group checkbox-group">
            <label>
              Water Right:
              <input type="checkbox" name="waterRight" checked={seller.waterRight} onChange={() => setSeller({ ...seller, waterRight: !seller.waterRight })} />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="update-button">Update Seller</button>
          </div>
        </form>

        {/* Add Listing Form */}
        <form onSubmit={handleListingSubmit} className="add-listing-form">
          <h2>Add Listing</h2>
          <div className="form-group">
            <label>Type:</label>
            <select name="type" value={listing.type} onChange={handleListingTypeChange}>
              <option value="water_share">Water Share</option>
              <option value="water_right">Water Right</option>
            </select>
          </div>
          {/* Fields for Water Share */}
          {listing.type === 'water_share' && (
            <>
              <div className="form-group">
                <label>Water Company Name:</label>
                <input type="text" name="waterCompanyName" value={listing.waterCompanyName} onChange={handleListingChange} />
              </div>
              <div className="form-group">
                <label>Acre Feet:</label>
                <input type="text" name="acreFeet" value={listing.acreFeet} onChange={handleListingChange} />
              </div>
              <div className="form-group">
                <label>Location (County/City):</label>
                <input type="text" name="location" value={listing.location} onChange={handleListingChange} />
              </div>
            </>
          )}
          {/* Fields for Water Right */}
          {listing.type === 'water_right' && (
            <>
              <div className="form-group">
                <label>Water Right Number:</label>
                <input type="text" name="waterRightNumber" value={listing.waterRightNumber} onChange={handleListingChange} />
              </div>
              <div className="form-group">
                <label>Acre Feet:</label>
                <input type="text" name="acreFeet" value={listing.acreFeet} onChange={handleListingChange} />
              </div>
              <div className="form-group">
                <label>Location (County/City):</label>
                <input type="text" name="location" value={listing.location} onChange={handleListingChange} />
              </div>
            </>
          )}
          <div className="form-group">
            <button type="submit" className="add-listing-button">Add Listing</button>
          </div>
          {listingMessage && <p className="listing-message">{listingMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditSeller;
