import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      name: '',
      email: '',
      rating: '',
      comments: '',
    };

    this.handleNameInput = this.handleInput.bind(this, 'name');
    this.handleEmailInput = this.handleInput.bind(this, 'email');
    this.handleRatingInput = this.handleInput.bind(this, 'rating');
    this.handleCommentsInput = this.handleInput.bind(this, 'comments');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (!this.validate()) {
      return;
    }

    const {
      name, email, rating, comments,
    } = this.state;
    const { onSubmitFeedback } = this.props;

    onSubmitFeedback({
      name,
      email,
      rating,
      comments,
    });
  }

  validate() {
    const {
      name, email, rating, comments,
    } = this.state;
    const errors = [];

    if (!name) {
      errors.push('Name is required');
    }

    if (!email) {
      errors.push('Email is required');
    } else if (email.indexOf('@') === -1) {
      errors.push('Email is invalid');
    }

    if (!rating) {
      errors.push('Rating is required');
    }

    if (!comments) {
      errors.push('Comments is required');
    }

    this.setState({ errors });

    return errors.length === 0;
  }

  renderErrors() {
    const { errors } = this.state;

    return errors.length === 0
      ? null
      : (
        <div style={{ marginBottom: '12px' }}>
          {
            errors.map((error) => (
              <div key={error} className="error" style={{ color: 'red' }}>{error}</div>
            ))
          }
        </div>
      );
  }

  render() {
    const {
      name, email, rating, comments,
    } = this.state;
    const { disabled } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="flex col">
        {this.renderErrors()}
        <input
          name="name"
          type="text"
          disabled={disabled}
          value={name}
          onChange={this.handleNameInput}
          placeholder="Name"
        />
        <input
          name="email"
          type="text"
          disabled={disabled}
          value={email}
          onChange={this.handleEmailInput}
          placeholder="Email address"
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          disabled={disabled}
          value={rating}
          onChange={this.handleRatingInput}
          placeholder="Rating"
        />
        <textarea
          name="comments"
          disabled={disabled}
          value={comments}
          onChange={this.handleCommentsInput}
          placeholder="Comments"
        />
        <button disabled={disabled} type="submit">Submit Feedback</button>
      </form>
    );
  }
}

FeedbackForm.propTypes = {
  disabled: PropTypes.bool,
  onSubmitFeedback: PropTypes.func.isRequired,
};

FeedbackForm.defaultProps = {
  disabled: false,
};
