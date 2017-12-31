import React, {Component} from 'react';

class AboutMe extends Component {
  render() {
    return(
      <div className = "aboutMe col-md-4 col-xs-12">
        <h1>About Me</h1>
        {/* <img src="file:///Users/luchenpeng/personal/website/frontend/assets/stylesheets/img/IMG_0478.jpg"/> */}
        <p>
          I like writing, code and words &&
          a corner on the internet is cheaper than a garage in SF.<br/>
          Hello! My name is Luchen Peng. I am trying this new thing called building a website of my own.
          I love
            writing (may it be code or words)
            traveling
            coffee
            sunshine
            beach
            books
            IPA
            80s music
            salsa dancing
            and people.
          Email me luchenpengnyc@gmail.com.
        </p>
      </div>
    )
  }
}

export default AboutMe;
