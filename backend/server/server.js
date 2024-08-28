import express from "express";
import morgan from "morgan";
import session from "express-session";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";

const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "mySpecialSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// Route handlers
app.post("/api/sellers", handlerFunctions.createSeller);
app.post("/api/buyers", handlerFunctions.createBuyer);
app.post("/api/register", handlerFunctions.registerUser);
app.post("/api/login", handlerFunctions.loginUser);
app.get("/api/sellers", handlerFunctions.getAllSellers);
app.get("/api/buyers", handlerFunctions.getAllBuyers);

// Routes for handling sellers by ID
app.get("/api/sellers/:sellerId", handlerFunctions.getSellerById);
app.put("/api/sellers/:sellerId", handlerFunctions.updateSeller);
app.delete("/api/sellers/:sellerId", handlerFunctions.deleteSeller);

// Routes for handling buyers by ID
app.get("/api/buyers/:buyerId", handlerFunctions.getBuyerById);
app.put("/api/buyers/:buyerId", handlerFunctions.updateBuyer);
app.delete("/api/buyers/:buyerId", handlerFunctions.deleteBuyer);

// Routes for handling listings
app.post("/api/listings", handlerFunctions.createListing);
app.get("/api/listings", handlerFunctions.getAllListings);
app.get("/api/listings/:listingId", handlerFunctions.getListingById);
app.put("/api/listings/:listingId", handlerFunctions.updateListing);
app.delete("/api/listings/:listingId", handlerFunctions.deleteListing);

// Run the server with ViteExpress
ViteExpress.listen(app, 9008, () => {
  console.log("Server running on http://localhost:9008");
});
