import React, { createContext } from 'react';

const DEFAULT_DIMENSIONS = { width: 0, height: 0 };

const ApplicationContext = createContext({ dimensions: DEFAULT_DIMENSIONS });

export const Consumer = (Component) => (props) => (
  <ApplicationContext.Consumer>
    {({ dimensions }) => <Component {...props} dimensions={dimensions} />}
  </ApplicationContext.Consumer>
);

// eslint-disable-next-line prefer-destructuring
export const Provider = ApplicationContext.Provider;
