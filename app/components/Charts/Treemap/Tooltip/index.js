import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

const numberFormat = new Intl.NumberFormat();

const renderLabel = (label) =>
  label ? (
    <Typography gutterBottom variant="h6" component="h2">
      {label}
    </Typography>
  ) : undefined;

const renderContent = (cases, type) =>
  cases && type ? (
    <Typography variant="body2" color="textSecondary" component="p">
      {`${numberFormat.format(cases)} ${type}`}
    </Typography>
  ) : undefined;

const TreemapTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <Card variant="outlined">
        <CardContent>
          {payload &&
            payload[0] &&
            payload[0].payload &&
            payload[0].payload.root &&
            renderLabel(payload[0].payload.root.name)}
          {payload[0].payload &&
            payload[0].payload &&
            payload[0].payload &&
            renderContent(payload[0].payload.cases, payload[0].payload.type)}
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
