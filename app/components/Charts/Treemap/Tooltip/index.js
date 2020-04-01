import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const numberFormat = new Intl.NumberFormat();

const TreemapTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div>{`${numberFormat.format(payload[0].payload.cases)} ${
        payload[0].payload.type
      } in ${payload[0].payload.root.name}`}</div>
    );
  }

  return <Fragment />;
};

TreemapTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        cases: PropTypes.number,
        type: PropTypes.string,
        root: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
  ),
};

export default TreemapTooltip;
