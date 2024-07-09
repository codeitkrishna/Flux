const express = require('express');
const cors = require('cors');
require('./database/connection').connection();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const userRoutes = require('./Routes/userRoutes')
const transactionRoutes = require('./Routes/transactionRoutes')
const sharedExpenseRoutes = require('./Routes/sharedExpenseRoutes')


dotenv.config();

const app = express();
const port = process.env.PORT; // or any port you prefer

app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // For parsing JSON bodies
app.use(cookieParser());

app.use('/api/userRoutes', userRoutes);
app.use('/api/transactionRoutes', transactionRoutes);
app.use('/api/sharedExpenseRoutes', sharedExpenseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
