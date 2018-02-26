import React, {Component} from 'react';
import { Link } from 'react-router-DOM';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import axios from 'axios';

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newDocName: '',
            contents: [{
              title: "My first article",
              post: "hello there!"
            }]
        };
    }

    // componentWillMount() {
    //     axios.post(`/getContents`)
    //   .then(posts=>{
    //       console.log(posts);
    //       this.setState({
    //           contents: posts.data
    //       });
    //   })
    //   .catch(err=>console.log("err in getting contents", err));
    // }

    newPost() {
        console.log(`/newPost`);
        axios.post("/newPost", {
            title: this.state.newDocName,
            body: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
            // user: this.props.user
        })
      .then(resp=>{
        console.log(resp.data);
        alert(" new document created!");
        this.setState({newDocName: ''})
      })
      .catch(err=>console.log(err))
    }

    render() {
        return (
      <div className = "contents col-md-8 col-xs-12">
        
        <TextField
          hintText="New Document Name"
          onChange = {(event)=>this.setState({newDocName: event.target.value})}
          value = {this.state.newDocName}/>
        <RaisedButton
          backgroundColor = {String(colors.gray200)}
          onMouseDown = {()=> this.newPost()}
          icon={<FontIcon className="material-icons"> home </FontIcon>}
        />
        <Tabs>
          <Tab icon={<FontIcon className="material-icons">favorite</FontIcon>}>
              <div className = "code">
                <h1>Code</h1>
                <ul>
                {this.state.contents.map((content)=>{
                    return(<Link to={`/post/${content._id}`}><li key = {content.id} postId = {content.id}>
                      {content.title}<br/>
                      {/* {content.post} */}
                    </li></Link>);
                })}
              </ul>
            </div>
          </Tab>
        </Tabs>
        <Tabs>
          <Tab icon={<FontIcon className="material-icons">favorite</FontIcon>}>
            <div className = "travel">
              <h1>Travel</h1>
            </div>
          </Tab>
        </Tabs>
        <Tabs>
          <Tab icon={<FontIcon className="material-icons">favorite</FontIcon>} >
          <div className = "write">
            <h1>Write</h1>
          </div>
        </Tab>
        </Tabs>
      </div>
    )}
}

export default Contents;
