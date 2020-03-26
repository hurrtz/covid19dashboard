import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';

import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_URL,
  API,
  FETCH_COUNTRY_DATA,
} from './constants';
import { setAvailableCountries, setCountryData } from './actions';
import { makeSelectedCountryObject } from './selectors';

export function* fetchCountries() {
  const countries = yield axios.get(FETCH_COUNTRIES_URL);

  yield put(setAvailableCountries(countries.data));
}

export function* fetchCountryData() {
  const selectedCountry = yield select(makeSelectedCountryObject());

  if (selectedCountry) {
    const countryData = yield axios.get(
      `${API}/country/${selectedCountry.Slug}/status/confirmed`,
    );

    yield put(setCountryData(countryData.data));
  }
}

export default function* applicationSaga() {
  yield takeLatest(FETCH_COUNTRY_DATA, fetchCountryData);
  yield takeLatest(FETCH_COUNTRIES, fetchCountries);
}
