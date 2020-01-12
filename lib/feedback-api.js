import firebaseConnector from './firebase-connector';

export default class FeedbackApi {
  constructor(config, databaseRef = 'feedback') {
    this.database = firebaseConnector(config).database();
    this.databaseRef = databaseRef;
  }

  async addFeedback(feedback) {
    await this.database.ref(this.databaseRef).push({
      ...feedback,
      date: new Date().toISOString(),
      rating: parseInt(feedback.rating, 10),
    });
  }

  listen(callback) {
    this.database.ref(this.databaseRef).on('child_added', (snapshot) => {
      const value = snapshot.val();

      callback({
        ...value,
        date: new Date(value.date),
      });
    });
  }
}
