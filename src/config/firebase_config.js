const { initializeApp } = require("firebase/app")
const { getAuth } = require("firebase/auth");
require('dotenv').config()

const firebaseConfig = {

    // apiKey: process.env.API_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    // storageBucket: process.env.STORAGE_BUCKET,
    // messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,

    apiKey: "AIzaSyBZYd5hbGvBWPlqSig3snbgL6tpeib8FHs",
    authDomain: "my-keywe.firebaseapp.com",
    projectId: "my-keywe",
    storageBucket: "my-keywe.appspot.com",
    messagingSenderId: "351183855081",
    appId: "1:351183855081:web:7c6b93691876d088bc3f78"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

module.exports = { auth }