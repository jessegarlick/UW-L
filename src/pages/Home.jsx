import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from '../images/jesseheader.jpeg';
import "../css/Home.css";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings');
        setListings(response.data.listings);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
        setError('Failed to load listings.');
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-container">
      <div className="image-overlay">
        <img className="home-image" src={Main} alt="Utah Lake" />
        <div className="text-overlay">
          <h1 className="overlay-text">Explore Water Rights and Water Shares</h1>
          <div className="search-bar-wrapper">
            <input type="text" className="search-bar" placeholder="Search County, City" />
          </div>
        </div>
      </div>

      <div className="listings-container">
        <h2>Available Listings</h2>
        {listings.length === 0 ? (
          <p>No listings available.</p>
        ) : (
          <ul className="listings-list">
            {listings.map((listing) => (
              <li key={listing.listingId} className="listing-item">
                <h3>{listing.waterCompanyName}</h3>
                <p>Acre Feet: {listing.waterAmount}</p>
                <p>Location: {listing.location}</p>
                <a href={`/listing/${listing.listingId}`}>Click for more info</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
