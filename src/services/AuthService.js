import api from "./api";
import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4GWQ8h7kJKO42w7KpXm1BLCyUw1s3NI8",
  authDomain: "album-andreayjuanma.firebaseapp.com",
  projectId: "album-andreayjuanma",
  storageBucket: "album-andreayjuanma.appspot.com",
  messagingSenderId: "339957850458",
  appId: "1:339957850458:web:57aa3b94b8cd5b378b9363",
};

// Initialize Firebase
if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}

const getToken = () => auth.currentUser.getIdToken(true);

const auth = firebase.auth();

const AuthService = {
  signInAnonimously: () =>
    auth
    .signInAnonymously()
    .then(user => {
      return getToken().then((token) => {
        api.defaults.headers.common["Authorization"] = token;
        return token;
      });
    }).catch(err => {
      console.log(err);
    })
    ,
  signIn: (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return getToken().then((token) => {
          api.defaults.headers.common["Authorization"] = token;
          return user;
        });
      }),
  userLoggedIn: (success, error) =>
    auth.onAuthStateChanged((user) => {
      if (user) {
        const handleToken = () => {
          getToken().then((token) => {
            api.defaults.headers.common["Authorization"] = token;
            if (success) success(user);
          });
        };
        
        setInterval(handleToken, 55 * 60 * 1000);

        handleToken();
      } else {
        // error();
      }
    }),
  signOut: () => auth.signOut(),
  signUp: (correo, password) =>
    auth.createUserWithEmailAndPassword(correo, password),
  recoverPassword: (email) => auth.sendPasswordResetEmail(email),
  getToken: () => auth.currentUser.getIdToken(true),
  verifyEmail: () => auth.currentUser.sendEmailVerification(),
  updateEmail: (email) => auth.currentUser.updateEmail(email),
  setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
  setupInterceptors: (callback) => {
    api.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.data) {
          if (error.response.data.code) {
            if (error.response.data.code === "auth/id-token-expired") {
              callback();
            }
          }
        }

        return Promise.reject(error);
      }
    );
  },
};

export default AuthService;
