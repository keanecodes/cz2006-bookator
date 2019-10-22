/**********************************************************************
 * You'll need to get the API keys for this to work.
 * `config.js` will contains all the public firebase API keys,
 * and `firebase-adminsdk.json` will contain all the private API keys
 *
 * --- How to get `config.js` ---
 * 1) Access Firebase console > Project settings > General
 * 2) Make a new empty `config.js` file in the same folder as this file
 * and copy them in like this:
 * `module.exports = {
 *  apiKey: "<SENSITIVE INFORMATION>",
 *  authDomain: "<SENSITIVE INFORMATION>",
 *  databaseURL: "<SENSITIVE INFORMATION>",
 *  projectId: "<SENSITIVE INFORMATION>",
 *  storageBucket: "<SENSITIVE INFORMATION>",
 *  messagingSenderId: "<SENSITIVE INFORMATION>",
 *  appId: "<SENSITIVE INFORMATION>"
 * }`
 *
 * --- How to get `firebase-adminsdk.json` ---
 * 1) Access Firebase console > Project settings > Service accounts
 * 2) Click the 'Generate new private key' button
 * and rename it to simply rename it to firebase-adminsdk.json
 *
 * And that's it! Good luck :]
 **********************************************************************/

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");
const { databaseURL, storageBucket } = require('./config')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
  storageBucket
});

const db = admin.firestore()

module.exports = { admin, db }