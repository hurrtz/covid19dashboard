import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeCountryDataForLineChart as makeData } from 'containers/HomePage/selectors';

import ChartLineComponent from 'components/Charts/Line';

const LineChart = (props) => props.data && <ChartLineComponent {...props} />;

LineChart.propTypes = {
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

const mapStateToProps = createSelector([makeData()], (data) => ({ data }));

export default connect(mapStateToProps)(LineChart);
