const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000;

// For dotenv 



// Middleware:
app.use(cors())
app.use(express.json())







app.get('/', async (req, res) => {
    res.send("Revive Mobile Server is Running now...")
})

app.listen(port, () => {
    console.log(`ReviveMobile server running on port ${port}`);
})