export const types = {
  FETCHTEAMS: 'TEAMS/FETCHTEAMS',
  // saga actions
  SUCCESS_FETCHTEAMS: 'TEAMS/SUCCESS_FETCHTEAMS',
  FAILURE_FETCHTEAMS: 'TEAMS/FAILURE_FETCHTEAMS',
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SUCCESS_FETCHTEAMS:
      return {
        ...action.teamData
      }

    case types.FAILURE_FETCHTEAMS:
      return initialState

    default:
      return state
  }
}

export const actions = {
  fetchTeams: () => ({ type: types.FETCHTEAMS }),
  successFetchTeams: (teamData) => ({ type: types.SUCCESS_FETCHTEAMS, teamData }),
}

export const selectors = {
  teams: (state) => state.team,
}
