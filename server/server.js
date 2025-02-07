// Import the Supabase client instance from db.js
const supabase = require('./db.js');

// Import Express.js to set up the server
const express = require('express');
const app = express();
const path = require('path');

// Define the port the server will listen on
const PORT = 5001;

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle all GET requests by sending back the React app's index.html file
// This ensures React Router can manage client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the Express server and log that it is running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to fetch data from the 'syllabus_info' table in Supabase
async function fetchData() {
    // Query the Supabase table to select all rows
    const { data, error } = await supabase
      .from('syllabus_info')  // Replace 'syllabus_info' with your actual table name if different
      .select('*');  // Select all columns
  
    // Handle potential errors during the data fetch
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.log('Data:', data);  // Log the fetched data to the console
    }
}

// Call fetchData and log its result
// Note: This will initially log a pending Promise because fetchData is asynchronous
console.log(fetchData());
