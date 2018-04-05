import React, {Component} from 'react';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [{ name: 'MadFlatter',
                description: ''},
            { name: 'BobaScript',
                description: ''},
            { name: 'Fran.AI',
                description: ''}],
            newProject: []};
    }

    render()  {
        return (
      <div className = "container">
        {this.state.projects.map((project)=>{
            <div className="project">
            {project.name}
          </div>;
        })}
      </div>
        );
    }
}

export default Projects;
