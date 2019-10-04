const { db } = require('../util/admin');

const DbDonations = db.collection('donations')

exports.getAllDonations = (req, res) => {
  DbDonations
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let donations = [];
      data.forEach(doc => {
        donations.push({
          donationId: doc.id,
          bookTitle: doc.data().bookTitle,
          donator: doc.data().donator,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(donations);
    })
    .catch((err) => console.error(err));
}

exports.donateABook = (req, res) => {
  const newDonation = {
    bookTitle: req.body.bookTitle,
    donator: req.user.username,
    createdAt: new Date().toISOString()
  }
  DbDonations
    .add(newDonation)
    .then(doc => {
      res.json({message: `document ${doc.id} created successfully`});
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong'});
      console.error(err);
    });
}