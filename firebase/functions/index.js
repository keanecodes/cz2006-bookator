const functions = require("firebase-functions");
const app = require('express')();
const cors = require('cors');
app.use(cors());

const authMiddleware = require('./util/authMiddleware');

const {
  getAllDonations,
  getUserDonations,
  getUserCollections,
  donateABook } = require("./handlers/donations");
const {
  signup,
  login,
  addUserDetails,
  getAuthenticatedUser
} = require("./handlers/users");

// Donations route
app.get('/donations', getAllDonations);
app.post('/donate', authMiddleware, donateABook);
app.get('/user/donations', authMiddleware, getUserDonations);
app.get('/user/collections', authMiddleware, getUserCollections);

// Users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user', authMiddleware, addUserDetails);
app.get('/user', authMiddleware, getAuthenticatedUser);

// exports.getDonations = functions.https.onRequest((req, res) => { });
// https://baseurl.com/api/_____
exports.api = functions.region("asia-east2").https.onRequest(app);
