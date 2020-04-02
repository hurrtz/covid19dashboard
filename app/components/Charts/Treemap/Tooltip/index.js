import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

const numberFormat = new Intl.NumberFormat();

const TreemapTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {payload[0].payload.root.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${numberFormat.format(payload[0].payload.cases)} ${
              payload[0].payload.type
            }`}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
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
