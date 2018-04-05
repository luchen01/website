import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import { Route, BrowserRouter} from 'react-router-DOM';
import Thoughts from '../components/Thoughts';
import Projects from '../components/Projects';
import Travel from '../components/Travel';
import AboutMe from '../components/AboutMe';
import NavBar from '../components/AppBar';
import Footer from '../components/Footer';

export default function Root({ store }) {
    return (
        <Provider store={store}>
          <div>
          <BrowserRouter basename="/">
            <div>
                <Route path={"/"} component = {NavBar} />
                <Route exact path={"/"}  component = {AppContainer} />
                <Route exact path={"/thoughts"}  component = {Thoughts} />
                <Route exact path={"/projects"}  component = {Projects} />
                <Route exact path={"/travel"}  component = {Travel} />
                <Route exact path={"/aboutme"}  component = {AboutMe} />
                <Route path={"/"} component = {Footer} />
            </div>
        </BrowserRouter>
        </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
