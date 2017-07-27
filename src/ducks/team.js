export const types = {
  REQUEST_FETCH: 'TEAMS/REQUEST_FETCH',
  REQUEST_INVITE_STUDENT: 'TEAMS/REQUEST_INVITE_STUDENT',
  REQUEST_CREATE: 'TEAMS/REQUEST_CREATE',
  // saga actions
  SUCCESS_FETCH: 'TEAMS/SUCCESS_FETCH',
  FAILURE_FETCH: 'TEAMS/FAILURE_FETCH',
  SUCCESS_INVITE_STUDENT: 'TEAMS/SUCCESS_INVITE_STUDENT',
  FAILURE_INVITE_STUDENT: 'TEAMS/FAILURE_INVITE_STUDENT',
  SUCCESS_CREATE: 'TEAMS/SUCCESS_CREATE',
  FAILURE_CREATE: 'TEAMS/FAILURE_CREATE'
};

const initialState = {
  fetched: false,
  loading: false,
  inviting: false,
  creating: false,
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

    case types.REQUEST_INVITE_STUDENT:
      return {
        ...state,
        inviting: true
      };

    case types.REQUEST_CREATE:
      return {
        ...state,
        creating: true
      };

    case types.SUCCESS_FETCH:
      return {
        ...state,
        fetched: true,
        loading: false,
        team: action.team
      };

    case types.SUCCESS_INVITE_STUDENT:
      return {
        ...state,
        inviting: false
      };

    case types.SUCCESS_CREATE:
      return {
        ...state,
        creating: false
      };

    case types.FAILURE_FETCH:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.FAILURE_INVITE_STUDENT:
      return {
        ...state,
        inviting: false,
        error: action.error
      };

    case types.FAILURE_CREATE:
      return {
        ...state,
        creating: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const actions = {
  fetch: () => ({ type: types.REQUEST_FETCH }),
  inviteStudent: (studentId) => ({ type: types.REQUEST_INVITE_STUDENT, studentId }),
  create: (teamName) => ({ type: types.REQUEST_CREATE, teamName }),
  // saga actions
  successFetch: (team) => ({ type: types.SUCCESS_FETCH, team }),
  failureFetch: (error) => ({ type: types.FAILURE_FETCH, error }),
  successInviteStudent: () => ({ type: types.SUCCESS_INVITE_STUDENT }),
  failureInviteStudent: (error) => ({ type: types.FAILURE_INVITE_STUDENT, error }),
  successCreate: () => ({ type: types.SUCCESS_CREATE }),
  failureCreate: (error) => ({ type: types.FAILURE_CREATE, error })
};

export const selectors = {
  isFetched: (state) => state.team.fetched,
  isLoading: (state) => state.team.loading,
  isInviting: (state) => state.team.inviting,
  isCreating: (state) => state.team.creating,
  error: (state) => state.team.error || '',
  team: (state) => state.team.team
};
