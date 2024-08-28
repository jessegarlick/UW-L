import bcrypt from "bcrypt";
import { Seller, Buyer, User, Listing, db } from "./model.js"; // Import your models including User and the database connection

async function seedDatabase() {
  try {
    // Sync the database (create tables if they don't exist)
    await db.sync({ force: true }); // Warning: This will drop existing tables and recreate them

    console.log("Database synced!");

    // Seed Sellers
    const sellers = await Seller.bulkCreate([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "555-1234",
        streetAddress: "123 Main St",
        city: "Salt Lake City",
        state: "UT",
        zipCode: "84101",
        waterShare: true,
        waterCompanyName: "Salt Lake Water Co.",
        waterAmount: 10,
        waterRight: true,
        waterRightNumber: "SL12345",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "555-5678",
        streetAddress: "456 Oak St",
        city: "Provo",
        state: "UT",
        zipCode: "84601",
        waterShare: false,
        waterCompanyName: "Provo Water Co.",
        waterAmount: 15,
        waterRight: false,
        waterRightNumber: null,
      },
    ]);

    console.log("Sellers seeded:", sellers);

    // Seed Buyers
    const buyers = await Buyer.bulkCreate([
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        phone: "555-6789",
        streetAddress: "789 Pine St",
        city: "Ogden",
        state: "UT",
        zipCode: "84401",
        preferredPropertyType: "Residential",
      },
      {
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        phone: "555-3456",
        streetAddress: "101 Maple St",
        city: "St. George",
        state: "UT",
        zipCode: "84770",
        preferredPropertyType: "Commercial",
      },
    ]);

    console.log("Buyers seeded:", buyers);

    // Seed Users with bcrypt password hashing
    const saltRounds = 10;
    const users = [
      {
        username: "jgarlick",
        password: await bcrypt.hash("passwordJesse", saltRounds),
        role: "admin",
      },
      {
        username: "mgarlick",
        password: await bcrypt.hash("passwordMatt", saltRounds),
        role: "editor",
      },
      {
        username: "jotteson",
        password: await bcrypt.hash("passwordJosh", saltRounds),
        role: "viewer",
      },
      {
        username: "tgarlick",
        password: await bcrypt.hash("passwordTim", saltRounds),
        role: "viewer",
      },
    ];

    const seededUsers = await User.bulkCreate(users);
    console.log("Users seeded:", seededUsers);

    // Seed Listings
    const listings = await Listing.bulkCreate([
      {
        listingType: "Water Share",
        waterCompanyName: "Salt Lake Water Co.",
        waterAmount: 10,
        location: "Salt Lake City",
        sellerId: sellers[0].sellerId,
      },
      {
        listingType: "Water Right",
        waterRightNumber: "SL12345",
        waterAmount: 5,
        location: "Salt Lake City",
        sellerId: sellers[0].sellerId,
      },
    ]);

    console.log("Listings seeded:", listings);

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Failed to seed the database:", error);
  } finally {
    await db.close(); // Close the database connection
  }
}

// Run the seed function
seedDatabase();
