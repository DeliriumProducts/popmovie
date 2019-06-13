import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
  apiKey: 'AIzaSyDq1b0fPObduPOjQZVj5BMX7DXPzAp4brg',
  authDomain: 'movie-app-47f9f.firebaseapp.com',
  databaseURL: 'https://movie-app-47f9f.firebaseio.com',
  projectId: 'movie-app-47f9f',
  storageBucket: 'movie-app-47f9f.appspot.com',
  messagingSenderId: '103784699318',
  appId: '1:103784699318:web:9708da4550647d3c'
};

class Firebase {
  constructor() {
    // https://github.com/zeit/next.js/issues/1999
    if (!app.apps.length) {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore();
      this.providers = {
        google: new app.auth.GoogleAuthProvider()
      };
    }
  }

  async register(name, email, password) {
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithPopup(provider) {
    if (this.providers[provider]) {
      return this.auth.signInWithPopup(this.providers[provider]);
    }
  }

  logout() {
    return this.auth.signOut();
  }

  onAuthStateChanged(cb) {
    return this.auth.onAuthStateChanged(cb);
  }

  getCurrentUser() {
    if (this.auth) {
      return this.auth.currentUser;
    }
  }

  getMovie(id) {
    return this.db
      .collection('movie')
      .doc(id)
      .get();
  }

  createMovie(movie) {
    return this.db
      .collection('movie')
      .doc()
      .set(movie);
  }
}

export default new Firebase();
