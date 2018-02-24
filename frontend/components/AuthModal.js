import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

class AuthModal extends React.Component {
    constructor(props) {
        super(props);
    }

  register(){
    console.log("here in register");
    axios.post('http://localhost:3000/register',{
      username: this.username.value,
      password: this.password.value
    })
    .then((user)=>{
      console.log('user', user);
      this.props.register(user.data.username, user.data.password);
      this.props.toggleModal()
    })
    .catch(err=>console.log(err));
  };

  login(){
    console.log("here in login");
    axios.post('http://localhost:3000/login',{
      username: this.username.value,
      password: this.password.value
    })
    .then((user)=>{
      console.log('user in login', user);
      this.props.login(user.data.username, user.data.password);
      this.props.toggleModal()
    })
    .catch(err=>console.log(err));
  };

    render() {
      return(
      <Modal  show={this.props.isModalOpen}
              onHide={() => this.toggleModal()}
              container={this}
              aria-labelledby="contained-modal-title">
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title">Login to your account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" ref={(input) => { this.username = input; }} className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" ref={(input) => { this.password = input; }} className="form-control"/>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick = {()=>this.login()}>Login</Button>
      <Button onClick = {()=>this.register()}>Register</Button>
      <Button onClick={()=>this.props.toggleModal()}>Close</Button>
      </Modal.Footer>
    </Modal>
      );
    }
}

export default AuthModal;
