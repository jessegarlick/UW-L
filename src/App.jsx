import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import More from "./pages/More";
import Signin from "./pages/Signin";
import AdminPage from "./pages/AdminPage";
import EditSeller from "./pages/EditSeller";
import EditBuyer from "./pages/EditBuyer";
import ListingDetail from './pages/ListingDetail';

import "./App.css";

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <BrowserRouter>
      <header>
        <nav>
          <div className="nav-section left-links">
            <NavLink to="/sell">Add Listing</NavLink>
          </div>
          <div className="nav-section logo-container">
            <NavLink className="logo-link" to="/">
              Utah Water and Land
            </NavLink>
          </div>
          <div className="nav-section right-links">
            <NavLink to="/buy">Buy</NavLink>
            <NavLink to="/sell">Sell</NavLink>
            <NavLink to="/more">More</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/admin">Dashboard</NavLink> {/* Dashboard link */}
                <NavLink to="/sign-in-out" onClick={handleSignOut}>
                  Sign Out
                </NavLink>
              </>
            ) : (
              <NavLink to="/sign-in-out">Sign In</NavLink>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/more" element={<More />} />
          <Route path="/sign-in-out" element={<Signin />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/edit-seller/:sellerId" element={<EditSeller />} />
          <Route path="/edit-buyer/:buyerId" element={<EditBuyer />} />
          <Route path="/listing/:listingId" element={<ListingDetail />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
