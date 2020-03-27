import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Typography,
  FormControl,
  NativeSelect,
  FormHelperText,
  RootRef,
  Paper,
  AppBar,
  Toolbar,
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
  makeCountryDataMappedForChart,
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
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6">
            <FormattedMessage {...messages.header} /> <span>&mdash;</span>{' '}
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={4}>
        <Grid item />
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
            <Paper elevation={3}>
              <LineChart
                width={width}
                height={height}
                data={data}
                margin={{ top: 25, right: 25, left: 0, bottom: 10 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="confirmed" stroke="#009" />
                <Line type="monotone" dataKey="recovered" stroke="#090" />
                <Line type="monotone" dataKey="deaths" stroke="#900" />
              </LineChart>
            </Paper>
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
  [
    makeSelectCountry(),
    makeAvailableCountries(),
    makeCountryDataMappedForChart(),
  ],
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
