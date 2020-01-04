// ============================
// IMPORTS
// ============================

const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const app = express();

// ============================
// SETUP
// ============================

app.use(express.static(path.join(__dirname, "client", "build")))

// ============================
// DATABASE
// ============================

// mongoose.connect('mongodb://localhost:27017/eztrackerDB', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin:QD3PIpQscMbHJeDH@eztrackerdb-mfsdl.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => {
  console.log('DB Connected!');
}).catch(error => {
  console.log('DATABASE ERROR:', error.message);
});

// ============================
// ROUTES
// ============================

const indexRoutes = require('./routes/index');
app.use(indexRoutes);

// ============================
// START SERVER
// ============================

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Server has started'));
