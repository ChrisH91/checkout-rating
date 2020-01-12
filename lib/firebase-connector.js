import firebase from 'firebase';

export default (config) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  return firebase;
};
