import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeCountryDataForTreemapChart as makeData } from 'containers/HomePage/selectors';
import ChartTreemapComponent from 'components/Charts/Treemap';
import { fetchSummary } from 'containers/HomePage/actions';

const TreemapChart = ({ data, fetchData, ...props }) => {
  useEffect(() => {
    fetchData();
  }, []);

  return data ? <ChartTreemapComponent data={data} {...props} /> : <Fragment />;
};

TreemapChart.propTypes = {
  fetchData: PropTypes.func.isRequired,
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

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchSummary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreemapChart);
