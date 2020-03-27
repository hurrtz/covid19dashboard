import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Typography,
  FormControl,
  NativeSelect,
  FormHelperText,
  RootRef,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from 'recharts';

import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectCountry,
  makeAvailableCountries,
  makeMappedCountryData,
} from './selectors';
import {
  setSelectedCountry,
  fetchCountries,
  fetchCountryData,
} from './actions';
import saga from './saga';

import messages from './messages';

const key = 'APPLICATION';

const homePage = ({
  selectedCountry,
  availableCountries,
  onSetSelectedCountry,
  handleFetchCountries,
  onFetchCountryData,
  data,
}) => {
  const rootRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useInjectSaga({ key, saga });

  useEffect(() => {
    handleFetchCountries();

    setWidth(rootRef.current.clientWidth);
    setHeight(rootRef.current.parentNode.parentNode.clientHeight - 104 - 86);
  }, []);

  useEffect(() => {
    onFetchCountryData();
  }, [selectedCountry]);

  return (
    <RootRef rootRef={rootRef}>
      <Grid container alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h2">
            <FormattedMessage {...messages.header} />
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">&mdash; Dashboard</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <FormControl>
            <NativeSelect
              value={selectedCountry}
              onChange={(event) => onSetSelectedCountry(event.target.value)}
            >
              {availableCountries.map((country) => (
                <option key={country.Country} value={country.Country}>
                  {country.Country}
                </option>
              ))}
            </NativeSelect>
            <FormHelperText>select your country</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          {data && (
            <LineChart width={width} height={height} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="confirmed" stroke="#009" />
              <Line type="monotone" dataKey="recovered" stroke="#090" />
              <Line type="monotone" dataKey="deaths" stroke="#900" />
            </LineChart>
          )}
        </Grid>
      </Grid>
    </RootRef>
  );
};

homePage.propTypes = {
  selectedCountry: PropTypes.string.isRequired,
  availableCountries: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.string,
      Slug: PropTypes.string,
      Provinces: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  onSetSelectedCountry: PropTypes.func.isRequired,
  handleFetchCountries: PropTypes.func.isRequired,
  onFetchCountryData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.string,
      Province: PropTypes.string,
      Lat: PropTypes.number,
      Lon: PropTypes.number,
      Date: PropTypes.string,
      Cases: PropTypes.number,
      Status: PropTypes.string,
    }),
  ),
};

const mapStateToProps = createSelector(
  [makeSelectCountry(), makeAvailableCountries(), makeMappedCountryData()],
  (selectedCountry, availableCountries, data) => ({
    selectedCountry,
    availableCountries,
    data,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  onSetSelectedCountry: (selectedCountry) =>
    dispatch(setSelectedCountry(selectedCountry)),
  handleFetchCountries: () => dispatch(fetchCountries()),
  onFetchCountryData: () => dispatch(fetchCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
