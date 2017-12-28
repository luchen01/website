import React, {Component} from 'react';
import { Link } from 'react-router-DOM';
// import axios from 'axios';

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [{
              title: "My first article",
              post: "hello there!"
            }]
        };
    }

    // componentWillMount() {
    //     axios.post(`${process.env.baseURL}/getContents`)
    //   .then(posts=>{
    //       this.setState({
    //           contents: posts.data
    //       });
    //   })
    //   .catch(err=>console.log("err in getting contents", err));
    // }

    render() {
        return (
      <div className = "contents col-md-8 col-xs-12" style = {{border: "2px solid black"}}>
        <h1>Contents</h1>
        <ul>
        {this.state.contents.map((content)=>{
            return(<Link to="/post"><li>
              {content.title}<br/>
              {content.post}
            </li></Link>);
        })}
      </ul>
      </div>
    )}
}

export default Contents;
