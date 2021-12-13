const admin = require("firebase-admin");

const serviceAccount = require("../db/misgrullas.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firebaseDb = admin.firestore();

const FieldValue = admin.firestore.FieldValue;

module.exports = { firebaseDb, FieldValue };