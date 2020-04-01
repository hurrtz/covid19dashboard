import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import store from 'store';

import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_URL,
  API,
  FETCH_COUNTRY_DATA,
  FETCH_SUMMARY,
  FETCH_SUMMARY_URL,
} from './constants';
import { setAvailableCountries, setCountryData, setSummary } from './actions';
import { makeSelectedCountryObject, makeAvailableCountries } from './selectors';

export function* fetchCountries() {
  if (!(yield select(makeAvailableCountries())).length) {
    const countries = yield axios.get(FETCH_COUNTRIES_URL);

    store.set('countries', countries.data);

    yield put(setAvailableCountries(countries.data));
  }
}

export function* fetchSummary() {
  const summary = yield axios.get(FETCH_SUMMARY_URL);

  yield put(setSummary(summary.data));
}

export function* fetchCountryData() {
  const selectedCountry = yield select(makeSelectedCountryObject());

  if (selectedCountry) {
    const countryDataConfirmed = yield axios.get(
      `${API}/country/${selectedCountry.Slug}/status/confirmed`,
    );

    yield put(setCountryData('confirmed', countryDataConfirmed.data));

    const countryDataRecovered = yield axios.get(
      `${API}/country/${selectedCountry.Slug}/status/recovered`,
    );

    yield put(setCountryData('recovered', countryDataRecovered.data));

    const countryDataDeaths = yield axios.get(
      `${API}/country/${selectedCountry.Slug}/status/deaths`,
    );

    yield put(setCountryData('deaths', countryDataDeaths.data));
  }
}

export default function* applicationSaga() {
  yield takeLatest(FETCH_COUNTRY_DATA, fetchCountryData);
  yield takeLatest(FETCH_COUNTRIES, fetchCountries);
  yield takeLatest(FETCH_SUMMARY, fetchSummary);
}
