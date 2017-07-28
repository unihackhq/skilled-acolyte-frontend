export const types = {
  REQUEST_FETCH: 'INVITE/REQUEST_FETCH',
  REQUEST_ACCEPT: 'INVITE/REQUEST_ACCEPT',
  REQUEST_IGNORE: 'INVITE/REQUEST_IGNORE',
  // saga actions
  SUCCESS_FETCH: 'INVITE/SUCCESS_FETCH',
  FAILURE_FETCH: 'INVITE/FAILURE_FETCH',
  SUCCESS_ACCEPT: 'INVITE/SUCCESS_ACCEPT',
  FAILURE_ACCEPT: 'INVITE/FAILURE_ACCEPT',
  SUCCESS_IGNORE: 'INVITE/SUCCESS_IGNORE',
  FAILURE_IGNORE: 'INVITE/FAILURE_IGNORE'
};

const emptyInvite = {
  accepting: false,
  ignoring: false
};
const composeInvite = (state = emptyInvite, action) => {
  switch(action.type) {
    case types.REQUEST_ACCEPT:
      return {
        ...state,
        accepting: true,
      };

    case types.REQUEST_IGNORE:
      return {
        ...state,
        ignoring: true,
      };

    case types.SUCCESS_ACCEPT:
      return {
        ...state,
        accepting: false,
      };

    case types.SUCCESS_IGNORE:
      return {
        ...state,
        ignoring: false,
      };

    default:
      return state;
  }
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

    case types.REQUEST_ACCEPT:
    case types.REQUEST_IGNORE:
    case types.SUCCESS_ACCEPT:
    case types.SUCCESS_IGNORE:
      return {
        ...state,
        invites: state.invites.map(
          (invite) => {
            if (invite.id === action.id) {
              return composeInvite(invite, action);
            }
            return invite;
          }
        )
      };

    case types.FAILURE_ACCEPT:
    case types.FAILURE_IGNORE:
      return {
        ...state,
        error: action.error
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
  accept: (id) => ({ type: types.REQUEST_ACCEPT, id }),
  ignore: (id) => ({ type: types.REQUEST_IGNORE, id }),
  // saga actions
  successFetch: (invites) => ({ type: types.SUCCESS_FETCH, invites }),
  failureFetch: (error) => ({ type: types.FAILURE_FETCH, error }),
  successAccept: (id) => ({ type: types.SUCCESS_ACCEPT, id }),
  failureAccept: (error) => ({ type: types.FAILURE_ACCEPT, error }),
  successIgnore: (id) => ({ type: types.SUCCESS_IGNORE, id }),
  failureIgnore: (error) => ({ type: types.FAILURE_IGNORE, error })
};

export const selectors = {
  isFetched: (state) => state.invite.fetched,
  isLoading: (state) => state.invite.loading,
  error: (state) => state.invite.error,
  invites: (state) => state.invite.invites
};
