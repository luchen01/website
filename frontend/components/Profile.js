import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Link} from 'react-router-DOM';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FontIcon from 'material-ui/FontIcon';
import axios from 'axios';
import { connect } from 'react-redux';
import {userData} from '../actions/index';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  toggle: {
    marginBottom: 16,
  },
};



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          edit: false
        };
            this.state = {
    }

    componentDidMount(){
      console.log('in profile componentDidMount');
      if(!this.props.userid) this.props.toUserData(this.props.match.params.userid);
    }

    componentWillMount() {
      // console.log('this.props.match.params.userid',this.props.match.params.userid);
      axios.post(`/myprofile`, {
        userid: this.props.match.params.userid
      })
      .then(resp=>{
        console.log('inside myprofile page', resp.data);
        let user = resp.data;
        if(user.profileUser.facebookId){
          user.profileUser.profileUrl = `https://graph.facebook.com/${user.profileUser.facebookId}/picture?type=large`
        }
          this.setState(user.profileUser);
      })
      .catch(err=>console.log(err));
    }

    saveEdit() {
        var sendingState = Object.assign({}, this.state, {userid: this.props.match.params.userid});
        axios.post(`${process.env.URL}/saveedit`, sendingState)
        .then(resp=>{
            console.log('resp.data', resp.data);
            if(resp.data) {
                this.setState({edit: false})
            };
            alert('Edit Saved!');
        })
        .catch(err=>console.log(err));
    }

    render() {
        return(
      <div>
        <div className = "profileContainer row">
          <div className = "infocontainer col-md-3 col-xs-12">
            <h1>My Dashboard</h1>
            <img className = "profileimg" src={this.state.profileUrl}></img>
            <h2>{this.state.firstname}</h2>
            <p>Hi! My name is {this.state.firstname}. I have just moved to San Francisco, and I am looking for apartments and roommates!</p>
          </div>
          <div className = "result container col-md-9 col-xs-12">
            <Tabs>
              <Tab label="Personal Information" >
                <div style = {{padding: '10px', margin: '10px', textAlign: 'center'}}>
                    <h2 style={styles.headline}>Profile Settings</h2>
                    <div style={{display: 'flex'}}>
                      <div className="left-column" style={{flex: 1}}>
                        <RaisedButton
                          primary={true}
                          style={{margin: '20px'}}
                          icon={<FontIcon className="material-icons"> mode_edit </FontIcon>}
                          label = {this.state.edit ? "Save" : "Edit"}
                          onClick = {()=>this.saveEdit()}
                        /><br/>
                        <Link to="/questionnaire"><RaisedButton
                          primary={true}
                          style={{margin: '20px'}}
                          icon={<FontIcon className="material-icons"> format_list_bulleted </FontIcon>}
                          label = "Questionnaire"
                        /></Link><br/>
                        <TextField
                          floatingLabelText="First Name"
                          type="text"
                          value={this.state.firstname}
                          onChange={(e)=>(this.setState({firstname: e.target.value}))}
                          // errorText="This field is required"
                        /><br />
                        <TextField
                          floatingLabelText="Last Name"
                          type="text"
                          value={this.state.lastname}
                          onChange={(e)=>(this.setState({lastname: e.target.value}))}
                          // errorText="This field is required"
                        /><br />
                        <TextField
                          floatingLabelText="Username"
                          type="text"
                          value={this.state.username}
                          onChange={(e)=>(this.setState({username: e.target.value}))}
                          // errorText="This field is required"
                        /><br />
                        <TextField
                          floatingLabelText="Email"
                          type="text"
                          value={this.state.email}
                          onChange={(e)=>(this.setState({email: e.target.value}))}
                          // errorText="This field is required"
                        /><br />
                        <TextField
                          floatingLabelText="Birthday"
                          type="date"
                          value={this.state.birthday}
                          onChange={(e)=>(this.setState({birthday: e.target.value}))}
                          // errorText="This field is required"
                        /><br />
                      </div>
                    </div>
                  </div>
          </Tab>
        </Tabs>
      </div>
    </div>
    </div>
        );
    }
}

/* Layout should include features like profile picture (could be imported from
Facebook and will be the default if the user logged in with Facebook), age,
compatibility ranking, and maybe some extra sections devoted to bio, perks of
being their roommate, etc. */
const mapDispatchToProps = (dispatch) => {
  return {
    toUserData: (userid)=>dispatch(userData(userid)),
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userid,
  };
}

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default Profile;
