const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cz2006-bookator.firebaseio.com"
});

const db = admin.firestore()

module.exports = { admin, db }