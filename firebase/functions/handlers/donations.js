const { db } = require('../util/admin');

const DbDonations = db.collection('donations')

donationStruct = donation => {
  return {
    donationId: donation.id,
    title: donation.data().title,
    author: donation.data().author,
    img: donation.data().img,
    tag: donation.data().tag,
    status: donation.data().status,
    donator: donation.data().donator,
    donatedDate: donation.data().donatedDate,
    collector: donation.data().collector,
    collectedDate: donation.data().collectedDate,
    depositPoint: donation.data().depositPoint,
    depositedDate: donation.data().depositedDate,
    volunteerDeliveryId: donation.data().volunteerDeliveryId
  }
}

exports.getAllDonations = (req, res) => {
  DbDonations
    .orderBy('donatedDate', 'desc')
    .get()
    .then(data => {
      let donations = [];
      data.forEach(doc => donations.push(donationStruct(doc)));
      return res.json(donations);
    })
    .catch((err) => console.error(err));
}

exports.getUserDonations = (req, res) => {
  DbDonations
    .where('donator', '==', req.user.username)
    .get()
    .then(data => {
      let donations = [];
      data.forEach(doc => donations.push(donationStruct(doc)));
      return res.json(donations.sort((a,b) => (a.donatedDate > b.donatedDate) ? -1 : ((a.donatedDate > b.donatedDate) ? 1 : 0)));
    })
    .catch((err) => console.error(err));
}

exports.getUserCollections = (req, res) => {
  DbDonations
    .where('collector', '==', req.user.username)
    .get()
    .then(data => {
      let donations = [];
      data.forEach(doc => donations.push(donationStruct(doc)));
      return res.json(donations.sort((a,b) => (a.donatedDate > b.donatedDate) ? -1 : ((a.donatedDate > b.donatedDate) ? 1 : 0)));
    })
    .catch((err) => console.error(err));
}

exports.donateABook = (req, res) => {
  const newDonation = {
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    tag: req.body.tag,
    status: "Pending",
    donator: req.user.username,
    donatedDate: new Date().toISOString(),
    collector: "",
    collectedDate: "",
    depositPoint: "",
    depositedDate: "",
    volunteerDeliveryId: "",
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