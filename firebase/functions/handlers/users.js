const { db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails
} = require('../util/validators');

// Sign users up
exports.signup = (req, res) => {
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ username: 'This username is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        name: newUser.name,
        username: newUser.username,
        mobile: newUser.mobile,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already is use' });
      } else {
        return res
          .status(500).json({ general: 'Something went wrong, please try again' });
      }
    });
};
// Log user in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-user
      return res
        .status(403)
        .json({ general: 'Wrong credentials, please try again' });
    });
};

// Add user details
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.username}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: 'Details added successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection('donations')
          .where('donator', '==', req.user.username)
          .get();
      }
    })
    .then((data) => {
      userData.donations = [];
      data.forEach((doc) => {
        userData.donations.push(doc.data());
      });
      db.doc(`/users/${req.user.username}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          userData.credentials = doc.data();
          return db
            .collection('donations')
            .where('collector', '==', req.user.username)
            .get();
        }
      })
      .then((data) => {
        userData.collections = [];
        data.forEach((doc) => {
          userData.collections.push(doc.data());
        });
        db.doc(`/users/${req.user.username}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            userData.credentials = doc.data();
            return db
              .collection('voluntaries')
              .where('volunteer', '==', req.user.username)
              .get();
          }
        })
        .then((data) => {
          userData.voluntaries = [];
          data.forEach((doc) => {
            userData.voluntaries.push(doc.data());
          });
          return res.json(userData);
        })
      })
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Upload a profile image for user
