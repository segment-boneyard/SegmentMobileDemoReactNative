import { call, put } from "redux-saga/effects";
import { getTraits } from "../Profiles";
import ProfileActions from "../Redux/ProfileRedux";

export function* getTraitsSaga(api, action) {
  try {
    const result = yield call(getTraits);
    yield put(ProfileActions.profileSuccess(result));
  } catch (e) {
    yield put(ProfileActions.profileFailure());
  }
}
