const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ✅ CORS setup
const FRONTEND = process.env.FRONTEND_ORIGIN || 'https://bookish-journey-w54qg7g4xqrf9x47-3000.app.github.dev';
app.use(cors({
  origin: FRONTEND,                // allow frontend URL from .env
  credentials: true,               // allow cookies / auth headers
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// ✅ Preflight for all routes
app.options('*', cors());

// ✅ Body parser
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const booksRoutes = require('./routes/booksRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const roomHistoryRoutes = require('./routes/roomHistoryRoutes');

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/room_history', roomHistoryRoutes);
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const roomRoutes = require('./routes/roomRoutes');
// const booksRoutes = require('./routes/booksRoutes');
// const employeesRoutes = require('./routes/employeesRoutes');
// const reviewsRoutes = require('./routes/reviewsRoutes');
// const roomHistoryRoutes = require('./routes/roomHistoryRoutes');

// app.use('/api/users', userRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/books', booksRoutes);
// app.use('/api/employees', employeesRoutes);
// app.use('/api/reviews', reviewsRoutes);
// app.use('/api/room_history', roomHistoryRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api', userRoutes);
// const roomRoutes = require('./routes/roomRoutes');
// app.use('/api', roomRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
