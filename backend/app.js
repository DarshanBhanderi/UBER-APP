// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const cookieParser = require('cookie-parser');
// const connectToDb = require('./db/db');
// const userRoutes = require('./routes/user.routes');
// const captainRoutes = require('./routes/captain.routes');
// const mapsRoutes = require('./routes/maps.routes');
// //const rideRoutes = require('./routes/ride.routes');

// connectToDb();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());



// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.use('/users', userRoutes);
// app.use('/captains', captainRoutes);
// app.use('/maps', mapsRoutes);
// //app.use('/rides', rideRoutes);




// module.exports = app;

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');

const app = express();

connectToDb();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes);
app.use('/api/maps', mapsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

module.exports = app;