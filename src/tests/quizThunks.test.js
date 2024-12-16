import { thunk } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Requests } from '../api/requests.js';
import { fetchCompanyQuizzes, fetchQuizById } from '../features/thunks/quizzesThunks.js';

const mockStore = configureMockStore([thunk]);

jest.mock('../api/requests.js');

describe('fetchQuizzes thunks', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      entities: [],
      next: null,
      prev: null,
      count: 0,
      loading: 'idle',
      error: null,
      currentQuiz: null,
    });
    jest.clearAllMocks();
  });

  test('dispatch quizzes after success fetch', async () => {
    const response = {
      data: {
        results: [{ id: 1, title: 'Quiz 1' }],
        count: 1,
        next: null,
        previous: null,
      },
    };
    Requests.prototype.getCompanyQuizzes = jest.fn().mockResolvedValue(response);
    await store.dispatch(fetchCompanyQuizzes({ company_id: 1, limit: 10, offset: 0 }));
    const actions = store.getActions();

    expect(actions[0]).toEqual(
      expect.objectContaining({
        type: 'quizzes/fetchCompanyQuizzes/pending',
        meta: expect.objectContaining({
          arg: { company_id: 1, limit: 10, offset: 0 },
        }),
      }),
    );
    expect.objectContaining({
      type: 'quizzes/fetchCompanyQuizzes/fulfilled',
      payload: response,
    });
  });
  test('dispatch quiz after success fetch', async () => {
    const response = { id: 1, title: 'Quiz 1' };
    Requests.prototype.getQuizById = jest.fn().mockResolvedValue(response);
    await store.dispatch(fetchQuizById({ quiz_id: 1 }));
    const actions = store.getActions();

    expect(actions[0]).toEqual(
      expect.objectContaining({
        type: 'quizzes/fetchQuizById/pending',
        meta: expect.objectContaining({
          arg: { quiz_id: 1 },
        }),
      }),
    );
    expect.objectContaining({
      type: 'quizzes/fetchQuizById/fulfilled',
      payload: response,
    });
  });
});
