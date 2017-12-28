import React from 'react';
import PropTypes from 'prop-types';

const Title = ( { name } ) => {
    return (
        <h1>Luchen Peng</h1>
    );
};

Title.propTypes = {
    name: PropTypes.string,
};


export default Title;
