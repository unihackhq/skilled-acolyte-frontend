import { actions as teamActions, selectors as teamSelectors } from './team';
import { actions as inviteActions, selectors as inviteSelectors } from './invite';

export const fetchTeam = (dispatch, state, eventId) => {
  // fetch if not already fetched
  const fetched = teamSelectors.isFetched(state);
  const loading = teamSelectors.isLoading(state);
  const event = teamSelectors.event(state);

  if ((fetched === false && loading === false) || (loading === false && event !== eventId)) {
    dispatch(teamActions.fetch(eventId));
  }
};

export const fetchInvite = (dispatch, state) => {
  // fetch if not already fetched
  if (inviteSelectors.isFetched(state) === false && inviteSelectors.isLoading(state) === false) {
    dispatch(inviteActions.fetch());
  }
};
