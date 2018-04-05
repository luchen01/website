import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer.js';
import Post from '../components/Post';
import Projects from '../components/Projects';
import Travel from '../components/Travel';
import AboutMe from '../components/AboutMe';
import DevTools from './DevTools';
import { Route, BrowserRouter} from 'react-router-DOM';

export default function Root({ store }) {
    return (
        <Provider store={store}>
          <BrowserRouter basename="/">
            <div>
                {/* <Route path={"/"} component = {NavBar} /> */}
                <Route exact path={"/"}  component = {AppContainer} />
                <Route exact path={"/post"}  component = {Post} />
                <Route exact path={"/projects"}  component = {Projects} />
                <Route exact path={"/travel"}  component = {Travel} />
                <Route exact path={"/aboutme"}  component = {AboutMe} />
                {/* <Route path={"/"} component = {Footer} /> */}
            </div>
        </BrowserRouter>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
