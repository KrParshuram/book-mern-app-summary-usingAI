const express = require('express');
const { generateSummary } = require('./summaryController');
const app = express();
const cors = require("cors");
const bookRoute = require("./routes/bookRoutes");
const bookModel = require("./models/bookModel"); // Import your book model
require("./connection/connection"); // Import the database connection

app.use(cors());
app.use(express.json());
app.use("/api/v1", bookRoute);

// Define the endpoint for generating summary based on book ID

app.post('/api/summary/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Fetch book details from the database based on the ID
        const book = await bookModel.findById(id);

        //reading book 

        console.log(book);
        
        // Pass the book details to the generateSummary function
        // Generate summary using the book details
        const summary = await generateSummary(book);

        // Send the generated summary as response
        res.status(200).json({ summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(1000, () => {
    console.log("Server started on port 1000");
});
