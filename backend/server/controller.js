import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { Seller, Buyer, User, Listing } from "../database/model.js"; // Import your models

const handlerFunctions = {
  // Create a new seller
  createSeller: async (req, res) => {
    console.log("Received data for new seller:", req.body); // Log the incoming data

    const {
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      state,
      zipCode,
      waterShare,
      waterCompanyName,
      waterRight,
      waterRightNumber,
    } = req.body;

    try {
      // Validate input data
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !streetAddress ||
        !city ||
        !state ||
        !zipCode
      ) {
        throw new Error("All required fields must be provided.");
      }

      // Create a new seller in the database
      const newSeller = await Seller.create({
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        city,
        state,
        zipCode,
        waterShare,
        waterCompanyName,
        waterRight,
        waterRightNumber,
      });
      console.log("New seller created successfully:", newSeller.toJSON()); // Log the newly created seller

      res.json({
        message: "New seller created successfully.",
        status: "success",
        seller: newSeller,
      });
    } catch (error) {
      console.error("Failed to create seller:", error); // Log the error
      res.status(500).json({
        message: "Failed to create seller.",
        status: "fail",
        error: error.message,
        seller: req.body, // Respond with the original request body or the partial newSeller
      });
    }
  },

  // Create a new buyer
  createBuyer: async (req, res) => {
    console.log("Received data for new buyer:", req.body); // Log the incoming data

    const {
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      state,
      zipCode,
      preferredPropertyType,
    } = req.body;

    try {
      // Validate input data
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !streetAddress ||
        !city ||
        !state ||
        !zipCode
      ) {
        throw new Error("All required fields must be provided.");
      }

      // Create a new buyer in the database
      const newBuyer = await Buyer.create({
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        city,
        state,
        zipCode,
        preferredPropertyType,
      });
      console.log("New buyer created successfully:", newBuyer.toJSON()); // Log the newly created buyer

      res.json({
        message: "New buyer created successfully.",
        status: "success",
        buyer: newBuyer,
      });
    } catch (error) {
      console.error("Failed to create buyer:", error); // Log the error
      res.status(500).json({
        message: "Failed to create buyer.",
        status: "fail",
        error: error.message,
        buyer: req.body, // Respond with the original request body or the partial newBuyer
      });
    }
  },

  // Get all sellers
  getAllSellers: async (req, res) => {
    try {
      const sellers = await Seller.findAll();
      res.json({
        message: "Sellers retrieved successfully.",
        status: "success",
        sellers,
      });
    } catch (error) {
      console.error("Failed to retrieve sellers:", error);
      res.status(500).json({
        message: "Failed to retrieve sellers.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Get all buyers
  getAllBuyers: async (req, res) => {
    try {
      const buyers = await Buyer.findAll();
      res.json({
        message: "Buyers retrieved successfully.",
        status: "success",
        buyers,
      });
    } catch (error) {
      console.error("Failed to retrieve buyers:", error);
      res.status(500).json({
        message: "Failed to retrieve buyers.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Get a seller by ID
  getSellerById: async (req, res) => {
    const { sellerId } = req.params;

    try {
      const seller = await Seller.findByPk(sellerId);
      if (!seller) {
        return res.status(404).json({
          message: "Seller not found.",
          status: "fail",
        });
      }

      res.json({
        message: "Seller retrieved successfully.",
        status: "success",
        seller,
      });
    } catch (error) {
      console.error("Failed to retrieve seller:", error);
      res.status(500).json({
        message: "Failed to retrieve seller.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Update a seller by ID
  updateSeller: async (req, res) => {
    const { sellerId } = req.params;
    const updatedData = req.body;

    try {
      const seller = await Seller.findByPk(sellerId);
      if (!seller) {
        return res.status(404).json({
          message: "Seller not found.",
          status: "fail",
        });
      }

      await seller.update(updatedData);
      res.json({
        message: "Seller updated successfully.",
        status: "success",
        seller,
      });
    } catch (error) {
      console.error("Failed to update seller:", error);
      res.status(500).json({
        message: "Failed to update seller.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Delete a seller by ID
  deleteSeller: async (req, res) => {
    const { sellerId } = req.params;

    try {
      const seller = await Seller.findByPk(sellerId);
      if (!seller) {
        return res.status(404).json({
          message: "Seller not found.",
          status: "fail",
        });
      }

      await seller.destroy();
      res.json({
        message: "Seller deleted successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Failed to delete seller:", error);
      res.status(500).json({
        message: "Failed to delete seller.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Get a buyer by ID
  getBuyerById: async (req, res) => {
    const { buyerId } = req.params;

    try {
      const buyer = await Buyer.findByPk(buyerId);
      if (!buyer) {
        return res.status(404).json({
          message: "Buyer not found.",
          status: "fail",
        });
      }

      res.json({
        message: "Buyer retrieved successfully.",
        status: "success",
        buyer,
      });
    } catch (error) {
      console.error("Failed to retrieve buyer:", error);
      res.status(500).json({
        message: "Failed to retrieve buyer.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Update a buyer by ID
  updateBuyer: async (req, res) => {
    const { buyerId } = req.params;
    const updatedData = req.body;

    try {
      const buyer = await Buyer.findByPk(buyerId);
      if (!buyer) {
        return res.status(404).json({
          message: "Buyer not found.",
          status: "fail",
        });
      }

      await buyer.update(updatedData);
      res.json({
        message: "Buyer updated successfully.",
        status: "success",
        buyer,
      });
    } catch (error) {
      console.error("Failed to update buyer:", error);
      res.status(500).json({
        message: "Failed to update buyer.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Delete a buyer by ID
  deleteBuyer: async (req, res) => {
    const { buyerId } = req.params;

    try {
      const buyer = await Buyer.findByPk(buyerId);
      if (!buyer) {
        return res.status(404).json({
          message: "Buyer not found.",
          status: "fail",
        });
      }

      await buyer.destroy();
      res.json({
        message: "Buyer deleted successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Failed to delete buyer:", error);
      res.status(500).json({
        message: "Failed to delete buyer.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Register a new user
  registerUser: async (req, res) => {
    console.log("Received data for new user registration:", req.body); // Log the incoming data

    const { username, password, role } = req.body;

    try {
      // Validate input data
      if (!username || !password || !role) {
        throw new Error("All required fields must be provided.");
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({
          message: "Username already exists.",
          status: "fail",
        });
      }

      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user in the database
      const newUser = await User.create({
        username,
        password: hashedPassword,
        role,
      });
      console.log("New user registered successfully:", newUser.toJSON()); // Log the newly registered user

      res.json({
        message: "New user registered successfully.",
        status: "success",
        user: newUser,
      });
    } catch (error) {
      console.error("Failed to register user:", error); // Log the error
      res.status(500).json({
        message: "Failed to register user.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Login a user
  loginUser: async (req, res) => {
    console.log("Received data for user login:", req.body); // Log the incoming data

    const { username, password } = req.body;

    try {
      // Validate input data
      if (!username || !password) {
        throw new Error("Both username and password must be provided.");
      }

      // Find the user in the database
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({
          message: "Invalid username or password.",
          status: "fail",
        });
      }

      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid username or password.",
          status: "fail",
        });
      }

      console.log("User logged in successfully:", user.toJSON()); // Log the successful login

      res.json({
        message: "User logged in successfully.",
        status: "success",
        user: {
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Failed to login user:", error); // Log the error
      res.status(500).json({
        message: "Failed to login user.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Create a new listing
  createListing: async (req, res) => {
    const { listingType, waterCompanyName, waterRightNumber, waterAmount, location, sellerId } = req.body;

    try {
      // Validate input data
      if (!listingType || !sellerId) {
        throw new Error("Listing type and seller ID are required.");
      }

      // Additional validation based on listing type
      if (listingType === "Water Share" && (!waterCompanyName || !waterAmount || !location)) {
        throw new Error("Water Share listings require water company name, acre feet, and location.");
      }

      if (listingType === "Water Right" && (!waterRightNumber || !waterAmount || !location)) {
        throw new Error("Water Right listings require water right number, acre feet, and location.");
      }

      // Create a new listing in the database
      const newListing = await Listing.create({
        listingType,
        waterCompanyName,
        waterRightNumber,
        waterAmount,
        location,
        sellerId, // Ensure this is included in the listing creation
      });
      console.log("New listing created successfully:", newListing.toJSON());

      res.json({
        message: "New listing created successfully.",
        status: "success",
        listing: newListing,
      });
    } catch (error) {
      console.error("Failed to create listing:", error);
      res.status(500).json({
        message: "Failed to create listing.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Get all listings
// In your handlerFunctions
getAllListings: async (req, res) => {
    try {
      const listings = await Listing.findAll();
      res.json({
        message: "Listings retrieved successfully.",
        status: "success",
        listings,
      });
    } catch (error) {
      console.error("Failed to retrieve listings:", error);
      res.status(500).json({
        message: "Failed to retrieve listings.",
        status: "fail",
        error: error.message,
      });
    }
  },
  

  // Get a specific listing by ID
  getListingById: async (req, res) => {
    const { listingId } = req.params;

    try {
      const listing = await Listing.findByPk(listingId);
      if (!listing) {
        return res.status(404).json({
          message: "Listing not found.",
          status: "fail",
        });
      }

      res.json({
        message: "Listing retrieved successfully.",
        status: "success",
        listing,
      });
    } catch (error) {
      console.error("Failed to retrieve listing:", error);
      res.status(500).json({
        message: "Failed to retrieve listing.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Update a specific listing by ID
  updateListing: async (req, res) => {
    const { listingId } = req.params;
    const updatedData = req.body;

    try {
      const listing = await Listing.findByPk(listingId);
      if (!listing) {
        return res.status(404).json({
          message: "Listing not found.",
          status: "fail",
        });
      }

      await listing.update(updatedData);
      res.json({
        message: "Listing updated successfully.",
        status: "success",
        listing,
      });
    } catch (error) {
      console.error("Failed to update listing:", error);
      res.status(500).json({
        message: "Failed to update listing.",
        status: "fail",
        error: error.message,
      });
    }
  },

  // Delete a specific listing by ID
  deleteListing: async (req, res) => {
    const { listingId } = req.params;

    try {
      const listing = await Listing.findByPk(listingId);
      if (!listing) {
        return res.status(404).json({
          message: "Listing not found.",
          status: "fail",
        });
      }

      await listing.destroy();
      res.json({
        message: "Listing deleted successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Failed to delete listing:", error);
      res.status(500).json({
        message: "Failed to delete listing.",
        status: "fail",
        error: error.message,
      });
    }
  },
};

export default handlerFunctions;
