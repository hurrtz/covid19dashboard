import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  FormControl,
  NativeSelect,
  FormHelperText,
  RootRef,
  Paper,
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

import Header from 'components/Header';
import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectProvince,
  makeAvailableCountries,
  makeCountryDataMappedForChart,
  makeHasProvinces,
  makeSelectedCountryObject,
} from './selectors';
import {
  setSelectedCountry,
  setSelectedProvince,
  fetchCountries,
  fetchCountryData,
} from './actions';
import saga from './saga';

const key = 'APPLICATION';

const homePage = ({
  selectedCountry,
  selectedProvince,
  availableCountries,
  onSetSelectedCountry,
  onSetSelectedProvince,
  handleFetchCountries,
  onFetchCountryData,
  data,
  hasProvinces,
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
    if (selectedCountry && selectedCountry.Country) {
      onFetchCountryData();
    }
  }, [selectedCountry]);

  return (
    <RootRef rootRef={rootRef}>
      <Header />
      <Grid container spacing={4}>
        <Grid item />
      </Grid>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid container spacing={4}>
            <Grid item>
              <FormControl>
                <NativeSelect
                  value={selectedCountry.Country}
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
            {hasProvinces && (
              <Grid item>
                <FormControl>
                  <NativeSelect
                    value={selectedProvince}
                    onChange={(event) =>
                      onSetSelectedProvince(event.target.value)
                    }
                  >
                    <option value="all">all</option>
                    {selectedCountry.Provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>select your province</FormHelperText>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Grid>
        {data && (
          <Grid item>
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
          </Grid>
        )}
      </Grid>
    </RootRef>
  );
};

homePage.propTypes = {
  selectedCountry: PropTypes.PropTypes.shape({
    Country: PropTypes.string,
    Provinces: PropTypes.arrayOf(PropTypes.string),
    Lat: PropTypes.number,
    Lon: PropTypes.number,
    Date: PropTypes.string,
    Cases: PropTypes.number,
    Status: PropTypes.string,
  }).isRequired,
  selectedProvince: PropTypes.string.isRequired,
  availableCountries: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.string,
      Slug: PropTypes.string,
      Provinces: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  onSetSelectedCountry: PropTypes.func.isRequired,
  onSetSelectedProvince: PropTypes.func.isRequired,
  handleFetchCountries: PropTypes.func.isRequired,
  onFetchCountryData: PropTypes.func.isRequired,
  hasProvinces: PropTypes.bool.isRequired,
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
    makeSelectedCountryObject(),
    makeSelectProvince(),
    makeAvailableCountries(),
    makeHasProvinces(),
    makeCountryDataMappedForChart(),
  ],
  (
    selectedCountry,
    selectedProvince,
    availableCountries,
    hasProvinces,
    data,
  ) => ({
    selectedCountry,
    selectedProvince,
    availableCountries,
    hasProvinces,
    data,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  onSetSelectedCountry: (selectedCountry) =>
    dispatch(setSelectedCountry(selectedCountry)),
  onSetSelectedProvince: (selectedProvince) =>
    dispatch(setSelectedProvince(selectedProvince)),
  handleFetchCountries: () => dispatch(fetchCountries()),
  onFetchCountryData: () => dispatch(fetchCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
