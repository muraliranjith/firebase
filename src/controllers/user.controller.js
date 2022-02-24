const { auth } = require('../config/firebase_config')
const {
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut,
    signInWithPopup,
    updateProfile,
    updateEmail,
} = require("firebase/auth");


const register = async (req, res) => {

    try {
        const user = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);

        res.send(user)

    } catch (error) { res.json({ error: error }) }
};


const login = async (req, res) => {

    try {

        const user = await signInWithEmailAndPassword(auth, req.body.email, req.body.password); res.send(user)

    } catch (error) { res.json({ message: "please check email or password", error: error }) }
};


const logout = async (req, res) => { await signOut(auth); res.json({ message: "logout successfully", }); }

const resetPassword = async (req, res) => {

    try {
        const result = await sendPasswordResetEmail(auth, req.body.email, { url: "http://localhost:3000/fire/users" });

        if (result) { res.json({ [pathname]: result }); return result }

    } catch { res.send("Email can not be empty") }
}


const getUser = (req, res) => { onAuthStateChanged(auth, (user) => user ? res.send(user.reloadUserInfo) : res.send("User is SignOut")); }


const userDelete = (req, res) => { deleteUser(auth.currentUser).then(() => res.send("users deleted")).catch(() => res.send("didn't find a user ")); }


const updateUserProfile = async (req, res) => {

    updateProfile(auth.currentUser, { displayName: req.body.displayName, photoURL: req.body.photoURL || "https://example.com/jane-q-user/profile.jpg" })

        .then(() => res.send("user updated")).catch(() => res.send("didn't find a user, Please login"));
}


const updateUserEmail = (req, res) => updateEmail(auth.currentUser, req.body.email).then(() => res.send("email updated")).catch(() => res.send("didn't find a user, Please login"));



const loginWithGoogle = () => {

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => { console.log(result) }).catch((err) => { console.log(err); })
}

const loginGithub = (req, res) => {

    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)

        .then((result) => { const credential = GithubAuthProvider.credentialFromResult(result) })

        .catch((error) => { const credential = GithubAuthProvider.credentialFromError(error) });
}

module.exports = { register, login, logout, resetPassword, getUser, updateUserProfile, updateUserEmail, loginWithGoogle, userDelete, loginGithub, }