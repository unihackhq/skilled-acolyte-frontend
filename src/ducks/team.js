export const types = {
  REQUEST_FETCH: 'TEAMS/REQUEST_FETCH',
  REQUEST_INVITE_STUDENT: 'TEAMS/REQUEST_INVITE_STUDENT',
  REQUEST_CREATE: 'TEAMS/REQUEST_CREATE',
  REQUEST_LEAVE: 'TEAMS/REQUEST_LEAVE',
  // saga actions
  SUCCESS_FETCH: 'TEAMS/SUCCESS_FETCH',
  FAILURE_FETCH: 'TEAMS/FAILURE_FETCH',
  SUCCESS_INVITE_STUDENT: 'TEAMS/SUCCESS_INVITE_STUDENT',
  FAILURE_INVITE_STUDENT: 'TEAMS/FAILURE_INVITE_STUDENT',
  SUCCESS_CREATE: 'TEAMS/SUCCESS_CREATE',
  FAILURE_CREATE: 'TEAMS/FAILURE_CREATE',
  SUCCESS_LEAVE: 'TEAMS/SUCCESS_LEAVE',
  FAILURE_LEAVE: 'TEAMS/FAILURE_LEAVE'
};

const initialState = {
  fetched: false,
  loading: false,
  inviting: false,
  creating: false,
  leaving: false,
  error: null,
  event: null,
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

    case types.REQUEST_LEAVE:
      return {
        ...state,
        leaving: true
      };

    /*
     * SUCCESS
     */
    case types.SUCCESS_FETCH:
      return {
        ...state,
        fetched: true,
        loading: false,
        event: action.eventId,
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

    case types.SUCCESS_LEAVE:
      return {
        ...state,
        leaving: false,
        team: null
      };

    /*
     * FAILURE
     */
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

    case types.FAILURE_LEAVE:
      return {
        ...state,
        leaving: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const actions = {
  fetch: (eventId) => ({ type: types.REQUEST_FETCH, eventId }),
  inviteStudent: (studentId) => ({ type: types.REQUEST_INVITE_STUDENT, studentId }),
  create: (teamName) => ({ type: types.REQUEST_CREATE, teamName }),
  leave: () => ({ type: types.REQUEST_LEAVE }),
  // saga actions
  successFetch: (team, eventId) => ({ type: types.SUCCESS_FETCH, team, eventId }),
  failureFetch: (error) => ({ type: types.FAILURE_FETCH, error }),
  successInviteStudent: () => ({ type: types.SUCCESS_INVITE_STUDENT }),
  failureInviteStudent: (error) => ({ type: types.FAILURE_INVITE_STUDENT, error }),
  successCreate: () => ({ type: types.SUCCESS_CREATE }),
  failureCreate: (error) => ({ type: types.FAILURE_CREATE, error }),
  successLeave: () => ({ type: types.SUCCESS_LEAVE }),
  failureLeave: (error) => ({ type: types.FAILURE_LEAVE, error })
};

export const selectors = {
  isFetched: (state) => state.team.fetched,
  isLoading: (state) => state.team.loading,
  isInviting: (state) => state.team.inviting,
  isCreating: (state) => state.team.creating,
  isLeaving: (state) => state.team.leaving,
  error: (state) => state.team.error || '',
  event: (state) => state.team.event,
  team: (state) => state.team.team
};
