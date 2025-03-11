// Import the Supabase client instance from db.js
const supabase = require('./db.js');
console.log(supabase);

// Import Express.js to set up the server
const express = require('express');

const app = express();
const path = require('path');
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Define the port the server will listen on
const PORT = 5001;

app.use(express.json());

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

app.post('/api/search', async (req, res) => {


  const searchTerm  = req.body['search'];
  console.log(searchTerm);
  
  try {
      const { data, error } = await supabase
          .from('syllabus_info')
          .select('*')
          .or(`course_code.ilike.%${searchTerm}%,subject.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`); 
      
      if (error) {
          throw error;
      }
      
      res.json({ success: true, data });

  } catch (error) {
      console.error('Search error:', error.message);
      res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/feedback', async (req, res) => {
    const feedbackData = req.body;
    
    try {
        const { data, error } = await supabase
            .from('student_feedback')
            .insert([feedbackData]);
        
        if (error) {
            throw error;
        }
        
        res.json({ success: true, message: 'Feedback stored successfully' });
    } catch (error) {
        console.error('Error storing feedback:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
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
fetchData();