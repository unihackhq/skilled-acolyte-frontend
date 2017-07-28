import { actions as teamActions, selectors as teamSelectors } from './team';
import { actions as inviteActions, selectors as inviteSelectors } from './invite';

export const fetchTeam = (dispatch, state) => {
  // fetch if not already fetched
  if (teamSelectors.isFetched(state) === false) {
    dispatch(teamActions.fetch());
  }
};

export const fetchInvite = (dispatch, state) => {
  // fetch if not already fetched
  if (inviteSelectors.isFetched(state) === false) {
    dispatch(inviteActions.fetch());
  }
};
