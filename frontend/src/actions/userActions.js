import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    //config object to send the content-type in the headers and pass the token for protected routes
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    //set the user to local storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
