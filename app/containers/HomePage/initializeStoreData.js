import store from 'store';

import {
  CHART_TYPE_LINE_CHART,
  DEFAULT_COUNTRY,
  DEFAULT_PROVINCE,
  DEFAULT_CITY,
} from './constants';

export const DEFAULT_CHART_TYPE = CHART_TYPE_LINE_CHART;

if (!store.get('chartType')) {
  store.set('chartType', DEFAULT_CHART_TYPE);
}

if (!store.get('country')) {
  store.set('country', DEFAULT_COUNTRY);
}

if (!store.get('province')) {
  store.set('province', DEFAULT_PROVINCE);
}

if (!store.get('city')) {
  store.set('city', DEFAULT_CITY);
}
