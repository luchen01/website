import React, {Component} from 'react';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [{ name: 'MadFlatter',
                description: 'An web app that helps people find apartments and roommates in San Francisco.',
                link: "https://github.com/luchen01/MadFlatter_frontend"},
            { name: 'BobaScript',
                description: 'New coding language that helps visualize fundamental computer science concepts.',
                link: "https://github.com/borajimin/BobaScript-frontend"},
            { name: 'Fran.AI',
                description: 'AI supported hotline that helps city nomads find resources that they need.',
                link: "https://github.com/luchen01/TwilioApp"}],
            newProject: []};
    }

    render()  {
        return (
      <div>
        {this.state.projects.map((project)=>{
            return(<div className="project">
            {project.name}<br/>
            {project.description}<br/>
            <a href ={project.link}>Link here</a>
          </div>);
        })}
      </div>
        );
    }
}

export default Projects;
