import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import { Route, BrowserRouter} from 'react-router-DOM';
import NavBar from '../components/AppBar';
import Footer from '../components/Footer';
import Post from '../components/Post';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <BrowserRouter basename="/">
              <div>
                  <Route path={"/"} component = {NavBar} />
                  <Route exact path={"/"}  component = {AppContainer} />
                  <Route exact path={"/post/:docid"}  component = {Post} />
                  <Route path={"/"} component = {Footer} />
              </div>
          </BrowserRouter>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
