import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-DOM';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import ActionHome from 'material-ui/svg-icons/action/home';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
      <div>
        <AppBar
          title="Luchen Peng"
          iconElementLeft={<Link to="/"><IconButton><ActionHome /></IconButton></Link>}
        />
      </div>
        );
    }
}

export default NavBar;
