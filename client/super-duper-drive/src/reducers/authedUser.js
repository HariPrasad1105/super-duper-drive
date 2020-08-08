import { AUTHED_USER_DETAILS } from '../actions/authedUser';

export const authedUser = (state = null, action) => {
  switch (action.type) {
    case AUTHED_USER_DETAILS:

      return {
        ...state,
        userProfile: {
          ...action.data
        }
      }

    default:
      return null;
  }
}