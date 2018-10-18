import React, { Component } from 'react'

class CreateSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      problem: '',
      expect:'',
      tried:'',
      suspect:'',
      topic:''
    }
    this.onProblemChangedHandler = this.onProblemChangedHandler.bind(this);
    this.onExpectChangedHandler = this.onExpectChangedHandler.bind(this);
    this.onTopicChangedHandler = this.onTopicChangedHandler.bind(this);
    this.onTriedChangedHandler = this.onTriedChangedHandler.bind(this);
    this.onSuspectChangedHandler = this.onSuspectChangedHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onProblemChangedHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.problem = event.target.value;
    this.setState(newState);
  }

  onExpectChangedHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.expect = event.target.value;
    this.setState(newState);
  }

  onTopicChangedHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.topic = event.target.value;
    this.setState(newState);
  }

  onTriedChangedHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.tried = event.target.value;
    this.setState(newState);
  }

  onSuspectChangedHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.suspect = event.target.value;
    this.setState(newState);
  }

  onSubmitHandler(event) {
    fetch('http://localhost:3000/createpost', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({
        createdby: this.props.userid,
        problem: this.state.problem,
        expect: this.state.expect,
        tried: this.state.tried,
        suspect: this.state.suspect,
        topic: this.state.topic,
      }),
    })
    .then(() => {
      this.props.fetchData();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
    const divStyle = {
      border: "1px solid black",
      width: "500px",
      height: "200px",
      textAlign: "left",
      display: 'block'
    }
    return (
      <div style = {divStyle}>
        <h2>Please enter the problem: </h2>
        <label>Problem: </label><input onChange = {this.onProblemChangedHandler} type="text" placeholder=""/><br></br>
        <label>What did I expect to happen: </label><input onChange = {this.onExpectChangedHandler} type="text" placeholder=""/><br></br>
        <label>What have I tried: </label><input onChange = {this.onTriedChangedHandler} type="text" placeholder=""/><br></br>
        <label>Why I suspect its not working: </label><input onChange = {this.onSuspectChangedHandler} type="text" placeholder=""/><br></br>
        <label>Topic: </label><input onChange = {this.onTopicChangedHandler} type="text" placeholder=""/><br></br>
        <div >
          <button type="submit" onClick={this.onSubmitHandler}>Submit</button>
        </div>
      </div>
    )
  }
 
}
export default CreateSection;