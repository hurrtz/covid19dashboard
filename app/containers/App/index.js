import React, { useEffect, useState, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, RootRef } from '@material-ui/core';
import { debounce } from 'lodash';

import { Provider as ApplicationProvider } from 'contexts/Application';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

const App = () => {
  const rootRef = useRef();

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  const updateDimensions = () =>
    setDimensions({
      height: rootRef.current.parentNode.clientHeight,
      width: rootRef.current.clientWidth,
    });

  const handleResize = debounce(updateDimensions, 1000);

  useEffect(() => {
    const { height, width } = dimensions;

    if (!height || !width) {
      updateDimensions();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <RootRef rootRef={rootRef}>
      <Container>
        <ApplicationProvider value={{ dimensions: { ...dimensions } }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/covid19dashboard" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </ApplicationProvider>
      </Container>
    </RootRef>
  );
};

export default App;
