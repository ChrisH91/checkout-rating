import FeedbackApi from '../lib/feedback-api';

const mockRef = jest.fn();
const mockPush = jest.fn();
const mockOn = jest.fn();

jest.mock('../lib/firebase-connector', () => () => ({
  database: () => ({
    ref: mockRef.mockImplementation(() => ({
      push: mockPush,
      on: mockOn,
    })),
  }),
}));

describe('FeedbackApi', () => {
  beforeEach(() => {
    mockRef.mockClear();
    mockPush.mockClear();
    mockOn.mockClear();
  });

  describe('#addFeedback', () => {
    it('adds feedback correctly', async () => {
      const api = new FeedbackApi({}, 'testref');

      await api.addFeedback({
        name: 'Test User',
        rating: '3',
        email: 'a@b.c',
        comments: 'Hi',
      });

      expect(mockRef).toBeCalledWith('testref');
      expect(mockPush).toBeCalledTimes(1);
      expect(mockPush).toBeCalledWith({
        name: 'Test User',
        rating: 3,
        email: 'a@b.c',
        comments: 'Hi',
        date: expect.any(String),
      });
    });

    it('adds feedback with a valid date', async () => {
      const api = new FeedbackApi({}, 'testref');
      const before = new Date();
      await api.addFeedback({
        name: 'Test User',
        rating: '3',
        email: 'a@b.c',
        comments: 'Hi',
      });
      const after = new Date();

      const { date } = mockPush.mock.calls[0][0];

      expect(new Date(date).getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(new Date(date).getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });
});
