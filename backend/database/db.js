import { Sequelize } from 'sequelize';

// Function to connect to the database using Sequelize
async function connectToDB(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    logging: console.log, // Set logging: false to disable outputting SQL queries to console
    define: {
      timestamps: false, // Do not add timestamp fields (createdAt and updatedAt) to tables
      underscored: true, // Use snake_case rather than camelCase for database columns
    },
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to DB successfully!');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }

  return sequelize;
}

export default connectToDB;
