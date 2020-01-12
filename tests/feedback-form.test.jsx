import React from 'react';
import { shallow } from 'enzyme';
import FeedbackForm from '../components/feedback-form';

describe('FeedbackForm', () => {
  describe('validation errors', () => {
    it('validates required fields on submit', () => {
      const wrapper = shallow(<FeedbackForm onSubmitFeedback={() => {}} />);
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

      const errorText = wrapper.find('.error').map((element) => element.text());

      expect(errorText).toContain('Name is required');
      expect(errorText).toContain('Email is required');
      expect(errorText).toContain('Rating is required');
      expect(errorText).toContain('Comments is required');
    });

    it('validates email validity', () => {
      const wrapper = shallow(<FeedbackForm onSubmitFeedback={() => {}} />);

      wrapper.find('input[name="email"]').simulate('change', { target: { value: 'bademail' } });
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

      const errorText = wrapper.find('.error').map((element) => element.text());

      expect(errorText).toContain('Email is invalid');
    });
  });

  describe('callback', () => {
    it("doesn't trigger callback if validation fails", () => {
      const callback = jest.fn();
      const wrapper = shallow(<FeedbackForm onSubmitFeedback={callback} />);
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

      expect(wrapper.find('.error').length).toBeGreaterThan(0);
      expect(callback).not.toHaveBeenCalled();
    });

    it('triggers callback with correct data if form validates', () => {
      const callback = jest.fn();
      const wrapper = shallow(<FeedbackForm onSubmitFeedback={callback} />);

      wrapper.find('input[name="name"]').simulate('change', { target: { value: 'Test User' } });
      wrapper.find('input[name="email"]').simulate('change', { target: { value: 'good@email.com' } });
      wrapper.find('input[name="rating"]').simulate('change', { target: { value: 5 } });
      wrapper.find('textarea[name="comments"]').simulate('change', { target: { value: 'This is great' } });

      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'good@email.com',
        rating: 5,
        comments: 'This is great',
      });
    });
  });
});
