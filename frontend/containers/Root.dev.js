import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer.js';
import DevTools from './DevTools';
import { Route, BrowserRouter} from 'react-router-DOM';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Root({ store }) {
    return (
        <Provider store={store}>
        <BrowserRouter basename="/">
        <MuiThemeProvider>
            <div>
                <AppContainer />
                <DevTools />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
