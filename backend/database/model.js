import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

const db = await connectToDB("postgresql:///jessegarlick");

class Seller extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Seller.init(
  {
    sellerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waterShare: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    waterCompanyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waterAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    waterRight: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    waterRightNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Seller",
    tableName: "sellers",
    timestamps: true,
  }
);

class Buyer extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Buyer.init(
  {
    buyerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferredPropertyType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Buyer",
    tableName: "buyers",
    timestamps: true,
  }
);

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin", // Default role, can be 'admin', 'editor', 'viewer', etc.
    },
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

class Listing extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Listing.init(
  {
    listingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listingType: {
      type: DataTypes.ENUM("Water Share", "Water Right"),
      allowNull: false,
    },
    waterCompanyName: {
      type: DataTypes.STRING,
      allowNull: true, // Only required if listingType is 'Water Share'
    },
    waterRightNumber: {
      type: DataTypes.STRING,
      allowNull: true, // Only required if listingType is 'Water Right'
    },
    waterAmount: {
      type: DataTypes.FLOAT,
      allowNull: true, // Only required if listingType is 'Water Right'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true, // County or city, based on user input
    },
  },
  {
    sequelize: db,
    modelName: "Listing",
    tableName: "listings",
    timestamps: true,
  }
);

// Define associations
Seller.hasMany(Listing, {
  foreignKey: "sellerId",
  onDelete: "CASCADE",
});

Listing.belongsTo(Seller, {
  foreignKey: "sellerId",
  onDelete: "CASCADE",
});

// Export the models
export { db, Seller, Buyer, User, Listing };
