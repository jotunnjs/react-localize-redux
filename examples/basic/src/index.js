import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import Main from './Main';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <LocalizeProvider>
    <Router> 
      <Route path="/" component={Main} />
    </Router>
  </LocalizeProvider>
);

render(<App />, document.getElementById('root'));
