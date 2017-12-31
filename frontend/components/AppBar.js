import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-DOM';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import ActionHome from 'material-ui/svg-icons/action/home';

class Logged extends React.Component {
  constructor(props) {
      super(props);
  }

  signout() {
    axios.get(`/logout`)
  .then((response)=>{
      console.log("response after logout", response.data);
  })
  .catch((err)=>{
      console.log('Error: ', err);
      return null;
  });
  }

  render(){
    return(
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <Link to={`/profile/${this.props.userid}`}>
          <MenuItem primaryText="Profile"
          /></Link>
        <Link to={`/messages/${this.props.userid}`}>
          <MenuItem primaryText="Message"
          /></Link>
        <Link to="/">
          <MenuItem primaryText="Sign out"
          onClick = {this.signout.bind(this)}
        /></Link>
      </IconMenu>
    );
  }
}



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
