const admin = require("firebase-admin");
const serviceAccount = require('../config/firebase-adminsdk.json')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


//create user for admin requesting feilds

// email: "string", emailVerified: boolean, phoneNumber, password: "string".displayName : "string", photoURL : string, disabled : boolean
/*
        email: req.body.email,
        emailVerified: req.body.emailVerified,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        displayName: req.body.displayName,
        photoURL: req.body.photoURL,
        disabled: req.body.disabled,
*/

const createUser = (req, res) => {

    const payload = {
        email: req.body.email,
        emailVerified: req.body.emailVerified,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        displayName: req.body.displayName,
        photoURL: req.body.photoURL,
        disabled: req.body.disabled,
    }

    admin.auth().createUser(payload).then((userRecord) => res.send(userRecord)).catch((error) => res.send('Error creating new user'));
}

const getUser = (req, res) => {

    admin.auth().getUser(req.params.uid).then((userRecord) => res.send(userRecord)).catch((error) => res.send('Error fetching user data:'));
}

const updateUser = (req, res) => {

    admin.auth().updateUser(req.params.uid,
        {
            email: req.body.email,
            emailVerified: req.body.emailVerified,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            displayName: req.body.displayName,
            photoURL: req.body.photoURL,
            disabled: req.body.disabled,

        }).then((userRecord) => res.send(userRecord)).catch((error) => res.send('Error deleting user:', error));
}

const removeUser = (req, res) => {

    admin.auth().deleteUser(req.params.uid).then(() => res.send('Successfully deleted user')).catch((error) => res.send('Error deleting user:', error));
}
const deleteMultipleUser = (req, res) => {

    const uid = req.body

    admin.auth().deleteUsers([uid]).then(() => res.send('users deleted successfully')).catch((error) => res.send('Error deleting user:', error));
}

const listuser = (req, res) => {

    admin.auth().listUsers(req.body.limit, req.body.nextpagetoken).then((userRecord) => res.send(userRecord)).catch((error) => res.send('Error listing users:'));
}

///admin Climes

const customClimes = (req, res) => {

    admin.auth().setCustomUserClaims(req.body.uid, { type: `${req.body.climetype}`, }).then(() => res.status(200).send("CustomUserClaims Added Succesfully"))
}

module.exports = { getUser, createUser, updateUser, removeUser, deleteMultipleUser, listuser, customClimes }