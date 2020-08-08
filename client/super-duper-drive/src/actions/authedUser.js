import Axios from "axios";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const AUTHED_USER_DETAILS = 'AUTHED_USER_DETAILS';
export const LOGOUT_USER = 'LOGOUT_USER';

export const handleAuthedUserDetails = () => {
  return (dispatch) => {
    dispatch(showLoading())
    const token = localStorage.getItem('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    Axios.get(`/user-profile?token=${token}`,
      headers
    )
      .then(response => dispatch(authedUserDetails(response.data)))
      .then(() => dispatch(hideLoading()))
      .catch(() => localStorage.removeItem('token'));
  }
}

const authedUserDetails = (data) => ({
  type: AUTHED_USER_DETAILS,
  data
})

