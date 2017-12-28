import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import './assets/stylesheets/base.scss';

const store = configureStore();

render(
  <MuiThemeProvider>
    <Root store={store} history={history} />
  </MuiThemeProvider>,
    document.getElementById('root')
);
