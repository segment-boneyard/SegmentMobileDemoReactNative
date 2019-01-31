import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  profileRequest: null,
  profileSuccess: ['traits'],
  profileFailure: null
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  traits: undefined,
  fetching: null,
  error: null
});

/* ------------- Reducers ------------- */

export const request = state => {
  return state.merge({ fetching: true, error: null, traits: null });
};

export const success = (state, action) => {
  const { traits } = action;
  console.log('MERGING:', state, action);
  return state.merge({ fetching: false, error: null, traits });
};

export const failure = state => {
  return state.merge({ fetching: false, error: true, traits: null });
};

export const checkoutEmail = state => {
  const { email } = action;
  return state.merge({ updateEmail: email });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure
});
