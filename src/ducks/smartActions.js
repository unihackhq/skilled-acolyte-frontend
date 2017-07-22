import { actions as teamActions, selectors as teamSelectors } from './team';
import { selectors as userSelectors } from './user';

export const fetchTeam = (dispatch, state) => {
  // fetch if not already fetched
  if (teamSelectors.isFetched(state) === false) {
    // send the user id to fetch (needed to find the team)
    dispatch(teamActions.fetch(userSelectors.details(state).id));
  }
};
