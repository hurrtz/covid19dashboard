import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart as RechartLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from 'recharts';

const LineChart = ({ width, height, data }) => (
  <RechartLineChart
    width={width}
    height={height}
    data={data}
    margin={{ top: 24, right: 48, left: 0, bottom: 12 }}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    <Line type="monotone" dataKey="confirmed" stroke="#009" />
    <Line type="monotone" dataKey="recovered" stroke="#090" />
    <Line type="monotone" dataKey="deaths" stroke="#900" />
  </RechartLineChart>
);

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
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

export default LineChart;
