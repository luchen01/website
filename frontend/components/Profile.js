import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Link} from 'react-router-DOM';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RoommateMatch from './RoommateMatch';
import ApartmentMatch from './ApartmentMatch';
import FontIcon from 'material-ui/FontIcon';
import axios from 'axios';
axios.defaults.withCredentials = true;
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

        const minDate = new Date();
            const maxDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 1);
            minDate.setHours(0, 0, 0, 0);
            maxDate.setFullYear(maxDate.getFullYear() + 1);
            maxDate.setHours(0, 0, 0, 0);

            this.state = {
              // bedsMaxrooom: 0,
              // bedsMinroom: 0,
              // maxBathroom: 0,
              // minBathroom: 0,
              // minDate: minDate,
              // maxDate: maxDate,
              autoOk: false,
              disableYearSelection: false,
              chipData: [
                {key: 0, label: 'I have a fluffy friend', icon: 'pets'},
                {key: 1, label: 'Laundry in unit plz', icon: 'local_laundry_service'},
                {key: 2, label: 'Gym in building', icon: 'fitness_center'},
                {key: 3, label: 'Wheelchair access', icon: 'accessible'},
                {key: 4, label: 'Furnished', icon: 'local_florist'}
              ]
            };
    }

    componentDidMount(){
      console.log('in profile componentDidMount');
      if(!this.props.userid) this.props.toUserData(this.props.match.params.userid);
    }

    componentWillMount() {
      // console.log('this.props.match.params.userid',this.props.match.params.userid);
      axios.post(`${process.env.URL}/myprofile`, {
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
                      <div className="right-column" style={{flex: 1}}>
                        {/* <div className = "col-md-5 col-xs-12"> */}
                          <div>
                            <FontIcon className="material-icons" style = {{margin: '5px'}}> hotel </FontIcon><br/>
                            <SelectField
                              floatingLabelText="Min Bedrooms"
                              value={"1"}
                              onChange={(event, index, value)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {bedsMin: value}))}
                              >
                                <MenuItem value={"1"} primaryText="1" />
                                <MenuItem value={"2"} primaryText="2" />
                                <MenuItem value={"3"} primaryText="3" />
                                <MenuItem value={"4"} primaryText="4" />
                                <MenuItem value={"5"} primaryText="5" />
                                <MenuItem value={"6"} primaryText="6" />
                                <MenuItem value={"7"} primaryText="7" />
                                <MenuItem value={"8"} primaryText="8" />
                              </SelectField><br/>
                              <SelectField
                                floatingLabelText="Max Bedrooms"
                                value={"1"}
                                onChange={(event, index, value)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {bedsMax: value}))}          >
                                <MenuItem value={"1"} primaryText="1" />
                                <MenuItem value={"2"} primaryText="2" />
                                <MenuItem value={"3"} primaryText="3" />
                                <MenuItem value={"4"} primaryText="4" />
                                <MenuItem value={"5"} primaryText="5" />
                                <MenuItem value={"6"} primaryText="6" />
                                <MenuItem value={"7"} primaryText="7" />
                                <MenuItem value={"8"} primaryText="8" />
                              </SelectField><br/>
                            </div>
                            <div>
                              <FontIcon className="material-icons"> wc </FontIcon><br/>
                              <SelectField
                                floatingLabelText="Min Bathrooms"
                                value={"1"}
                                onChange={(event, index, value)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {bathsMin: value}))}
                                >
                                  <MenuItem value={"1"} primaryText="1" />
                                  <MenuItem value={"2"} primaryText="2" />
                                  <MenuItem value={"3"} primaryText="3" />
                                  <MenuItem value={"4"} primaryText="4" />
                                  <MenuItem value={"5"} primaryText="5" />
                                  <MenuItem value={"6"} primaryText="6" />
                                  <MenuItem value={"7"} primaryText="7" />
                                  <MenuItem value={"8"} primaryText="8" />
                                </SelectField><br/>
                                <SelectField
                                  floatingLabelText="Max Bathrooms"
                                  value={"1"}
                                  onChange={(event, index, value)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {bathsMax: value}))}
                                  >
                                    <MenuItem value={"1"} primaryText="1" />
                                    <MenuItem value={"2"} primaryText="2" />
                                    <MenuItem value={"3"} primaryText="3" />
                                    <MenuItem value={"4"} primaryText="4" />
                                    <MenuItem value={"5"} primaryText="5" />
                                    <MenuItem value={"6"} primaryText="6" />
                                    <MenuItem value={"7"} primaryText="7" />
                                    <MenuItem value={"8"} primaryText="8" />
                                  </SelectField><br/>
                                  <FontIcon className="material-icons"> money </FontIcon><br/>
                                  <SelectField
                                    floatingLabelText="Min Price"
                                    value={"500"}
                                    onChange={(event, index, value)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {priceMin: value}))}
                                    >
                                      <MenuItem value={"500"} primaryText="500" />
                                      <MenuItem value={"1000"} primaryText="1000" />
                                      <MenuItem value={"15000"} primaryText="1500" />
                                      <MenuItem value={"2000"} primaryText="2000" />
                                      <MenuItem value={"2500"} primaryText="2500" />
                                      <MenuItem value={"3000"} primaryText="3000" />
                                    </SelectField><br/>
                                    <SelectField
                                      floatingLabelText="Max Price"
                                      value={"2000"}
                                      onChange={(event, index, value)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {priceMax: value}))}
                                      >
                                        <MenuItem value={"2000"} primaryText="2000" />
                                        <MenuItem value={"2500"} primaryText="2500" />
                                        <MenuItem value={"3000"} primaryText="3000" />
                                        <MenuItem value={"3500"} primaryText="3500" />
                                        <MenuItem value={"4000"} primaryText="4000" />
                                        <MenuItem value={"5000"} primaryText="5000" />
                                        <MenuItem value={"7500"} primaryText="7500" />
                                        <MenuItem value={"10000"} primaryText="10000" />
                                      </SelectField><br/>
                                    </div>
                                    {/* <div>
                                      <FontIcon className="material-icons">date_range</FontIcon><br/>
                                      <DatePicker
                                        onChange={(event, date)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {dateAvailableStart: date}))}
                                        autoOk={false}
                                        floatingLabelText="Min Available Date"
                                        defaultDate={this.props.filters.dateAvailableEnd}
                                        disableYearSelection={this.state.disableYearSelection}
                                      />
                                      <DatePicker
                                        onChange={(event, date)=>this.props.toChangeFilters(Object.assign({}, this.props.filters, {dateAvailableEnd: date}))}
                                        autoOk={false}
                                        floatingLabelText="Max Available Date"
                                        defaultDate={this.props.filters.dateAvailableEnd}
                                        disableYearSelection={this.state.disableYearSelection}
                                      />
                                    </div> */}
                                    {/* <div>
                                      <FontIcon className="material-icons">playlist_add</FontIcon>Additional filters<br/>
                                      {this.state.chipData.map(chip=>{
                                        return(
                                          <Chip key = {chip.key}
                                            style={styles.chip}
                                            onRequestDelete={()=>this.handleRequestDelete(chip.key)}>
                                            <Avatar icon = {<FontIcon className = "material-icons">{chip.icon}</FontIcon>}/>
                                            {chip.label}
                                          </Chip>
                                        )
                                      })}
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab label="Roommate Matches" >
                              {/* <Link to='/mygroup/1'><RaisedButton
                                primary={true}
                                style={{margin: '20px'}}
                                label = "See my group"
                              /></Link><br/>
                              <Link to="/browseroommate"><RaisedButton
                                primary={true}
                                style={{margin: '20px'}}
                                label = "Browse more roommates"
                              /></Link><br/> */}
                              <RoommateMatch />
                            </Tab>
                            <Tab label="Apartment Matches" >
                              {/* <Link to="/browseapartment"><RaisedButton
                                primary={true}
                                style={{margin: '20px'}}
                                label = "Browse more apartment"
                              /></Link><br/> */}
                              <ApartmentMatch />
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
