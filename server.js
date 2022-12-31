const express = require('express');
const connection = require('./api/database/database');
require('dotenv').config({ path: '.env' });

const app = express();
app.use(express.json());

// Server connection
connection();

// Routes
app.use("/api/auth", require("./api/routes/authentication.route"));

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        version: '0.0.1'
    })
})


const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`server listening on http://localhost:${port}`));