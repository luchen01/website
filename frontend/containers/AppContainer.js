import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import AboutMe from '../components/AboutMe';
import Contents from '../components/Contents';
import Slider from '../components/Slider';

const AppContainer = ({ name }) => {
    return (
      <div>
        <div className = "container">
            <Slider />
          <div className = "topSection">
            <Contents />
            <AboutMe />
          </div>
        </div>
        </div>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
