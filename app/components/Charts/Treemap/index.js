import React from 'react';
import PropTypes from 'prop-types';
import { Treemap as TreemapChart, Tooltip } from 'recharts';

import TreemapTooltip from './Tooltip';

const Treemap = ({ width, height, data }) => (
  <TreemapChart
    width={width}
    height={height}
    data={data}
    dataKey="cases"
    margin={{ top: 8, right: 24, left: 0, bottom: 12 }}
    isAnimationActive={false}
    aspectRatio={3 / 4}
  >
    <Tooltip content={<TreemapTooltip />} />
  </TreemapChart>
);

Treemap.propTypes = {
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

export default Treemap;
