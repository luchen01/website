import React, {Component} from 'react';
import { Link } from 'react-router-DOM';

class Contents extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         newDocName: '',
    //         contents: [{
    //           title: "My first article",
    //           post: "hello there!"
    //         }]
    //     };
    // }

    render() {
        return (
      <div className = "contents" >
        {/* <nav className="navbar navbar-inverse"> */}
              <Link to="/projects"><button className="btn btn-danger navbar-btn">Projects</button></Link>
              <Link to="/travel"><button className="btn btn-primary navbar-btn">Travel</button></Link>
              <Link to="/thoughts"><button className="btn btn-secondary navbar-btn">Thoughts</button></Link>
              <Link to="/aboutme"><button className="btn btn-danger navbar-btn">About Me</button></Link>
          {/* </nav> */}
      </div>
        );
    }
}

export default Contents;
