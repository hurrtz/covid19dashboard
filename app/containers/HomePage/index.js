/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Typography,
  Divider,
  FormControl,
  NativeSelect,
  FormHelperText,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectCountry, makeAvailableCountries } from './selectors';
import { setSelectedCountry, fetchCountries } from './actions';
import saga from './saga';

import messages from './messages';

const key = 'APPLICATION';

const homePage = ({
  selectedCountry,
  availableCountries,
  handleSetSelectedCountry,
  handleFetchCountries,
}) => {
  useInjectSaga({ key, saga });

  useEffect(() => {
    handleFetchCountries();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h2">
          <FormattedMessage {...messages.header} />
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3">Dashboard</Typography>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item>
          <FormControl>
            <NativeSelect
              value={selectedCountry}
              onChange={(event) => handleSetSelectedCountry(event.target.value)}
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
      </Grid>
    </Grid>
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
  handleSetSelectedCountry: PropTypes.func.isRequired,
  handleFetchCountries: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  [makeSelectCountry(), makeAvailableCountries()],
  (selectedCountry, availableCountries) => ({
    selectedCountry,
    availableCountries,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  handleSetSelectedCountry: (selectedCountry) =>
    dispatch(setSelectedCountry(selectedCountry)),
  handleFetchCountries: () => dispatch(fetchCountries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
