const { admin, db } = require('../util/admin');

const config = require('../util/config');

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

// Upload a profile image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const tempImgUrl = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${imageFileName}?alt=media`;
        // return db.doc(`/users/${req.user.username}`).update({ tempImgUrl });
        return db.doc(`/tempimage/5JoitMtlzhuOlc0OAhlw`).update({ tempImgUrl });
      })
      .then(() => {
        return res.json({ message: 'image uploaded successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'something went wrong' });
      });
  });
  busboy.end(req.rawBody);
};

exports.donateABook = (req, res) => {
  let url = ""
  db.collection('tempimage')
    .get().then(data => {
      data.forEach(doc => url = doc.data().tempImgUrl);

      const newDonation = {
        title: req.body.title,
        author: req.body.author,
        // img: req.user.tempImgUrl,
        img: url === "" ? "https://firebasestorage.googleapis.com/v0/b/cz2006-bookator.appspot.com/o/no-img.jpeg?alt=media" : url,
        tag: req.body.tag,
        status: "Pending",
        donator: req.user ? req.user.username : req.body.donator,
        donatedDate: new Date().toISOString(),
        collector: "",
        collectedDate: "",
        depositPoint: req.body.depositPoint,
        depositedDate: "",
        volunteerDeliveryId: "",
      }

      DbDonations
        .add(newDonation)
        .then(doc => {
          // db.doc(`/users/${req.user.username}`).update({ tempImgUrl: "" });
          db.doc(`/tempimage/5JoitMtlzhuOlc0OAhlw`).update({ tempImgUrl: "" });
          res.json({message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
          res.status(500).json({ error: 'something went wrong'});
          console.error(err);
        });
    })
}

exports.deleteDonation = (req, res) => {
  const document = db.doc(`/donations/${req.params.donationId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Donation not found' });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Donation deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};