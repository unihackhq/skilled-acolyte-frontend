export const types = {
  REQUEST_FETCH: 'TEAMS/REQUEST_FETCH',
  // saga actions
  SUCCESS_FETCH: 'TEAMS/SUCCESS_FETCH',
  FAILURE_FETCH: 'TEAMS/FAILURE_FETCH'
};

const initialState = {
  fetched: false,
  loading: false,
  error: null,
  team: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_FETCH:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.SUCCESS_FETCH:
      return {
        ...state,
        fetched: true,
        loading: false,
        team: action.team
      };

    case types.FAILURE_FETCH:
      return {
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const actions = {
  fetch: (userId) => ({ type: types.REQUEST_FETCH, userId }),
  successFetch: (team) => ({ type: types.SUCCESS_FETCH, team }),
  failureFetch: (error) => ({ type: types.REQUEST_FETCH, error })
};

export const selectors = {
  isFetched: (state) => state.team.fetched,
  isLoading: (state) => state.team.loading,
  error: (state) => state.team.error || '',
  team: (state) => state.team.team
};
