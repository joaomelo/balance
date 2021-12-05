import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export function initFirebaseSuite(config) {
  const app =
    firebase.apps.length === 0
      ? firebase.initializeApp(config)
      : firebase.apps[0];

  const suite = {
    app,
    firestore: app.firestore(),
    fireauth: app.auth(),
  };

  return suite;
}
