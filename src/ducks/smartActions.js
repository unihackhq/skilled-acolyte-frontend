import { actions as teamActions, selectors as teamSelectors } from './team';

export const fetchTeam = (dispatch, state) => {
  // fetch if not already fetched
  if (teamSelectors.isFetched(state) === false) {
    dispatch(teamActions.fetch());
  }
};
