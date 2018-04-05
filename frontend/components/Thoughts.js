import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import * as colors from 'material-ui/styles/colors';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import axios from 'axios';

class Thoughts extends Component {
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
        this.setState({newDocName: ''});
    })
    .catch(err=>console.log(err));
    }


    // componentWillMount() {
    //     axios.post(`/getContents`)
    //       .then(posts=>{
    //           console.log(posts);
    //           this.setState({
    //               contents: posts.data
    //           });
    //       })
    //       .catch(err=>console.log("err in getting contents", err));
    // }

    render() {
        return(
          <div className = "container">
          <div>Travel</div>
          <TextField
            hintText="New Document Name"
            onChange = {(event)=>this.setState({newDocName: event.target.value})}
            value = {this.state.newDocName}/>
          <RaisedButton
            backgroundColor = {String(colors.gray200)}
            onMouseDown = {()=> this.newPost()}
            icon={<FontIcon className="material-icons"> home </FontIcon>}
          />
          <div>
              different pages
              <ul>
              {this.state.contents.map((blog)=>{
                  <li>{blog}</li>;
              })}
            </ul>
          </div>
        </div>
        );
    }
}

export default Thoughts;
