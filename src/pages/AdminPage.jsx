import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminPage.css';

function AdminPage() {
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState(''); // State to toggle between sellers and buyers
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sellersResponse, buyersResponse] = await Promise.all([
          axios.get('/api/sellers'),
          axios.get('/api/buyers'),
        ]);

        setSellers(sellersResponse.data.sellers);
        setBuyers(buyersResponse.data.buyers);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateSeller = (sellerId) => {
    navigate(`/edit-seller/${sellerId}`);
  };

  const handleUpdateBuyer = (buyerId) => {
    navigate(`/edit-buyer/${buyerId}`);
  };

  const renderSellers = () => (
    <div className="grid-container">
      {sellers.map(seller => (
        <div key={seller.sellerId} className="data-item">
          <p><strong>ID:</strong> {seller.sellerId}</p>
          <p><strong>First Name:</strong> {seller.firstName}</p>
          <p><strong>Last Name:</strong> {seller.lastName}</p>
          <p><strong>Email:</strong> {seller.email}</p>
          <p><strong>Phone:</strong> {seller.phone}</p>
          <p><strong>Street Address:</strong> {seller.streetAddress}</p>
          <p><strong>City:</strong> {seller.city}</p>
          <p><strong>State:</strong> {seller.state}</p>
          <p><strong>Zip Code:</strong> {seller.zipCode}</p>
          <p><strong>Water Share:</strong> {seller.waterShare ? 'Yes' : 'No'}</p>
          <p><strong>Water Company Name:</strong> {seller.waterCompanyName}</p>
          <p><strong>Water Right:</strong> {seller.waterRight ? 'Yes' : 'No'}</p>
          <p><strong>Water Right Number:</strong> {seller.waterRightNumber || 'N/A'}</p>
          <p><strong>Water Amount:</strong> {seller.waterAmount} acre feet</p> {/* Added waterAmount field */}
          <button onClick={() => handleUpdateSeller(seller.sellerId)}>Update</button>
        </div>
      ))}
    </div>
  );

  const renderBuyers = () => (
    <div className="grid-container">
      {buyers.map(buyer => (
        <div key={buyer.buyerId} className="data-item">
          <p><strong>ID:</strong> {buyer.buyerId}</p>
          <p><strong>First Name:</strong> {buyer.firstName}</p>
          <p><strong>Last Name:</strong> {buyer.lastName}</p>
          <p><strong>Email:</strong> {buyer.email}</p>
          <p><strong>Phone:</strong> {buyer.phone}</p>
          <p><strong>Street Address:</strong> {buyer.streetAddress}</p>
          <p><strong>City:</strong> {buyer.city}</p>
          <p><strong>State:</strong> {buyer.state}</p>
          <p><strong>Zip Code:</strong> {buyer.zipCode}</p>
          <p><strong>Preferred Property Type:</strong> {buyer.preferredPropertyType}</p>
          <button onClick={() => handleUpdateBuyer(buyer.buyerId)}>Update</button>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>

      <div className="button-container">
        <button 
          className={`toggle-button ${view === 'sellers' ? 'active' : ''}`} 
          onClick={() => setView('sellers')}
        >
          Sellers
        </button>
        <button 
          className={`toggle-button ${view === 'buyers' ? 'active' : ''}`} 
          onClick={() => setView('buyers')}
        >
          Buyers
        </button>
      </div>

      {view === 'sellers' ? renderSellers() : renderBuyers()}
    </div>
  );
}

export default AdminPage;
