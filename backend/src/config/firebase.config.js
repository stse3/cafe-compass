//firebase connection settings
require ('dotenv').config();
const admin = require ('firebase-admin')


const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-credentials.json';

try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
        credential:admin.credential.cert(serviceAccount)
    })
}catch (error){
    console.error("Error intializing the Firebase Admin SDK: ",error)
}

//get instance of firestore database

const db = admin.firestore();

module. exports = {
    admin,
    db,
    projectID: process.env.projectID,
    serviceAccount: serviceAccountPath
}
