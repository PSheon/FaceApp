import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';
import * as Actions from 'app/store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ email, password }) {
  return dispatch =>
    jwtService
      .signInWithEmailAndPassword({ email, password })
      .then(user => {
        dispatch(setUserData(user));

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(({ response }) => {
        const message = response.data.errors.msg;
        dispatch({
          type: LOGIN_ERROR,
          payload:
            message && (message.email || message.password)
              ? message
              : { email: '帳號或密碼錯誤', password: '' }
        });

        dispatch({
          type: Actions.SHOW_MESSAGE,
          options: { message: `帳號或密碼錯誤！` }
        });
      });
}

export function submitLoginGoogle(googleInfo) {
  return dispatch =>
    jwtService
      .signInWithGoogle(googleInfo)
      .then(user => {
        dispatch(setUserData(user));

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(({ response }) => {
        if (response.data.errors.msg.includes('E11000')) {
          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: {
              message: `Google 信箱 ${googleInfo.googleEmail} 已被註冊`
            }
          });
        } else {
          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: { message: `帳號或密碼錯誤！` }
          });
        }
      });
}

export function submitLoginFacebook(facebookInfo) {
  return dispatch =>
    jwtService
      .signInWithFacebook(facebookInfo)
      .then(user => {
        dispatch(setUserData(user));

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(({ response }) => {
        if (
          response.data.errors &&
          response.data.errors.msg.includes('E11000')
        ) {
          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: {
              message: `FB 信箱 ${facebookInfo.facebookEmail} 已被註冊`
            }
          });
        } else {
          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: { message: `帳號或密碼錯誤！` }
          });
        }
      });
}

export function submitLinkGoogle(googleInfo) {
  return dispatch =>
    jwtService
      .linkGoogle(googleInfo)
      .then(user => {
        dispatch(setUserData(user));

        dispatch({
          type: Actions.SHOW_MESSAGE,
          options: { message: `已連結 Google 信箱 ${googleInfo.googleEmail}` }
        });
      })
      .catch(err => {
        // console.log('err ', err)
        dispatch({
          type: Actions.SHOW_MESSAGE,
          options: { message: `Google 帳號已被使用` }
        });
      });
}

export function submitLinkFacebook(facebookInfo) {
  return dispatch =>
    jwtService
      .linkFacebook(facebookInfo)
      .then(user => {
        dispatch(setUserData(user));

        dispatch({
          type: Actions.SHOW_MESSAGE,
          options: { message: `已連結 FB 信箱 ${facebookInfo.facebookEmail}` }
        });
      })
      .catch(err => {
        // console.log('err ', err)
        dispatch({
          type: Actions.SHOW_MESSAGE,
          options: { message: `Facebook 帳號已被使用` }
        });
      });
}

export function submitLoginWithFireBase({ username, password }) {
  return dispatch =>
    firebaseService.auth &&
    firebaseService.auth
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        const usernameErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];

        const response = {
          username: usernameErrorCodes.includes(error.code)
            ? error.message
            : null,
          password: passwordErrorCodes.includes(error.code)
            ? error.message
            : null
        };

        if (error.code === 'auth/invalid-api-key') {
          dispatch(Actions.showMessage({ message: error.message }));
        }

        return dispatch({
          type: LOGIN_ERROR,
          payload: response
        });
      });
}
