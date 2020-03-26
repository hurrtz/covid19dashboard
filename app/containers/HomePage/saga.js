import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_COUNTRIES, FETCH_COUNTRIES_URL } from './constants';
import { setAvailableCountries } from './actions';

export function* fetchCountries() {
  const countries = yield axios.get(FETCH_COUNTRIES_URL);

  yield put(setAvailableCountries(countries.data));
}

export default function* applicationSaga() {
  yield takeLatest(FETCH_COUNTRIES, fetchCountries);
}
