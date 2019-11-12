const functions = require("firebase-functions");
const app = require('express')();
const cors = require('cors');
app.use(cors());

const authMiddleware = require('./util/authMiddleware');

const { getAllDonations, donateABook } = require("./handlers/donations");
const {
  signup,
  login,
  addUserDetails,
  getAuthenticatedUser
} = require("./handlers/users");

// Donations route
app.get('/donations', getAllDonations);
app.post('/donate', authMiddleware, donateABook);
app.post('/user', authMiddleware, addUserDetails);
app.get('/user', authMiddleware, getAuthenticatedUser);

// Users route
app.post('/signup', signup);
app.post('/login', login);

// exports.getDonations = functions.https.onRequest((req, res) => { });
// https://baseurl.com/api/_____
exports.api = functions.region("asia-east2").https.onRequest(app);
