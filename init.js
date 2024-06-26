const { MongoClient } = require('mongodb');
import userModel from './models/userModel'
async function initializeDatabase() {
  const uri = 'mongodb://localhost:27017/devportal'; // Ensure this is the correct hostname and port for your setup
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('devportal');
    const collection = database.collection('User');

    // Insert default values
    const result = await collection.insertMany([
        { username: "admin1", email: "admin1@devportal.com", password: "admin@123!", isVerified: true, isAdmin: true },
        // Add more documents as needed
    ]);
    console.log(result)
    console.log('Default values inserted');
  } catch (error) {
    console.error('Initialization failed:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Call the initialization function
initializeDatabase().then(() => {
  console.log('Initialization complete');
}).catch(error => {
  console.error('Initialization failed:', error);
});
