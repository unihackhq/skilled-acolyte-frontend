export const types = {
  REQUEST_FETCH: 'INVITE/REQUEST_FETCH',
  // saga actions
  SUCCESS_FETCH: 'INVITE/SUCCESS_FETCH',
  FAILURE_FETCH: 'INVITE/FAILURE_FETCH'
};

const initialState = {
  fetched: false,
  loading: false,
  error: null,
  invites: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_FETCH:
      return {
        ...state,
        loading: true
      };

    case types.SUCCESS_FETCH:
      return {
        ...state,
        fetched: true,
        loading: false,
        invites: action.invites
      };

    case types.FAILURE_FETCH:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const actions = {
  fetch: () => ({ type: types.REQUEST_FETCH }),
  // saga actions
  successFetch: (invites) => ({ type: types.SUCCESS_FETCH, invites }),
  failureFetch: (error) => ({ type: types.FAILURE_FETCH, error })
};

export const selectors = {
  isFetched: (state) => state.invite.fetched,
  isLoading: (state) => state.invite.loading,
  error: (state) => state.invite.error,
  invites: (state) => state.invite.invites
};
