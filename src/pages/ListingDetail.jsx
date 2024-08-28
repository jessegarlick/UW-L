import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ListingDetail() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${listingId}`);
        setListing(response.data.listing);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
        setError('Failed to load listing.');
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div>
      <h2>{listing.waterCompanyName}</h2>
      <p>Acre Feet: {listing.waterAmount}</p>
      <p>Location: {listing.location}</p>
      <p>Water Right Number: {listing.waterRightNumber}</p>
    </div>
  );
}

export default ListingDetail;
