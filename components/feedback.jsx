import React, { Component } from 'react';
import config from '../config.json';
import FeedbackApi from '../lib/feedback-api';
import FeedbackResultsGraph from './feedback-results-graph';
import FeedbackForm from './feedback-form';

export default class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitInProgress: false,
      feedback: [],
      currentFeedbackIndex: 0,
    };

    this.feedbackApi = new FeedbackApi(config.firebase);
    this.onSubmitFeedback = this.onSubmitFeedback.bind(this);
    this.nextComment = this.nextComment.bind(this);
    this.previousComment = this.previousComment.bind(this);
  }

  componentDidMount() {
    this.feedbackApi.listen((newFeedback) => {
      const { feedback } = this.state;
      this.setState({
        feedback: [...feedback, newFeedback],
      });
    });
  }

  async onSubmitFeedback(feedback) {
    this.setState({ submitInProgress: true });
    await this.feedbackApi.addFeedback(feedback);
    this.setState({ submitInProgress: false });
  }


  nextComment() {
    const { currentFeedbackIndex } = this.state;
    this.setState({ currentFeedbackIndex: currentFeedbackIndex + 1 });
  }

  previousComment() {
    const { currentFeedbackIndex } = this.state;
    this.setState({ currentFeedbackIndex: (currentFeedbackIndex - 1) });
  }

  renderFeedbackResults() {
    const { feedback, currentFeedbackIndex } = this.state;

    if (feedback.length === 0) {
      return null;
    }

    const currentFeedback = feedback[currentFeedbackIndex];
    const ratings = feedback.map((feedbackItem) => feedbackItem.rating);

    return (
      <span>
        <h2>Feedback Trend</h2>
        <FeedbackResultsGraph ratings={ratings} />
        <h2>Latest Comment</h2>
        <div style={{ lineHeight: '18px' }}>
          <div>{currentFeedback.comments}</div>
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#999' }}>
            -
            {' '}
            <strong>{currentFeedback.name}</strong>
          </div>
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#999' }}>
            {currentFeedback.date.toLocaleDateString()}
&nbsp;
            {currentFeedback.date.toLocaleTimeString()}
          </div>
          <div style={{ textAlign: 'right', marginTop: '12px' }}>
            <button
              type="button"
              disabled={currentFeedbackIndex === 0}
              onClick={this.previousComment}
            >
              Prev
            </button>
            <button
              type="button"
              disabled={currentFeedbackIndex >= feedback.length - 1}
              onClick={this.nextComment}
              style={{ marginLeft: '20px' }}
            >
              Next
            </button>
          </div>
        </div>
      </span>
    );
  }

  render() {
    const { submitInProgress } = this.state;

    return (
      <div className="flex shadow" style={{ width: '100%', maxWidth: '1000px' }}>
        <div className="feedback-container flex col justify-center">
          <h2>Send Some Feedback</h2>
          <FeedbackForm
            disabled={submitInProgress}
            onSubmitFeedback={this.onSubmitFeedback}
          />
        </div>
        <div className="feedback-container flex col">{this.renderFeedbackResults()}</div>

        <style jsx>
          {`
            h2 {
              margin-bottom: 24px;
            }

            .feedback-container {
              width: 50%;
              padding: 24px;
            }

            .feedback-container:first-child {
              background: white;
            }

            .feedback-container:last-child {
              background: #f0f0f0;
            }
          `}
        </style>
      </div>
    );
  }
}
