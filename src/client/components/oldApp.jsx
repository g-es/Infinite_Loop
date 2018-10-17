import React, { Component } from 'react';
import PostSection from './PostSection.jsx';
import Signup from './Signup.jsx';
import CreateSection from './CreateSection.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'
const mapStateToProps = store => ({

})
const mapDispatchToProps = dispatch => ({
  
})

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      notStarted: [],
      inProgress: [],
      closed: [],
      role: '',
      loggedIn: false,
      userid: 0
    };

    this.onSignupChangedHandler = this.onSignupChangedHandler.bind(this);
    this.onSignupSubmitHandler = this.onSignupSubmitHandler.bind(this);
    this.onSignupNameChangeHandler = this.onSignupNameChangeHandler.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }
  changeStatus(userId, postStatus, postId) {
    fetch('http://localhost:3000/status', {
      headers: {'Content-Type': 'application/json'},
      method:'PATCH',
      body: JSON.stringify({
        status: postStatus,
        postid: postId,
        userid: userId,
      })
    })
    .then(()=> {
      this.fetchData();
    })
    .catch(err => console.log(err));
  }

  // onSignupChangedHandler(event) {
  //   const newState = Object.assign({}, this.state);
  //   newState.role = event.currentTarget.value;
  //   this.setState(newState);
  // }

  // onSignupNameChangeHandler(event) {
  //   const newState = Object.assign({}, this.state);
  //   newState.name = event.target.value;
  //   console.log(newState.name);
  //   this.setState(newState);
  // }

  onSignupSubmitHandler() {
    fetch('http://localhost:3000/createuser', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        role: this.state.role,
      }),
      headers: {'Content-Type': 'application/json'},
    })
      .then(data => data.json())
      .then(data => {
        this.onLoginHandler(data.id);
      })
      .then(() => this.fetchData())
      .catch(err => {
        console.log(err);
      })
  }

  onLoginHandler(userid) {
    const newState = Object.assign({}, this.state);
    newState.loggedIn = true;
    newState.userid = userid;
    this.setState(newState);
  }

  fetchData() {
    const notStarted = [];
    const inProgress = [];
    const closed = [];
    fetch('http://localhost:3000/home', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(posts => posts.json())
    .then(posts => {
      posts.forEach((post) => {
        console.log(post);
        if (post.status === 'open') {
          notStarted.push(post)
        }
        if (post.status === 'claimed') {
          inProgress.push(post)
        }
        if (post.status === 'closed') {
          closed.push(post)
        }
      })
      const newState = Object.assign({}, this.state);
      newState.notStarted = notStarted;
      newState.inProgress = inProgress;
      newState.closed = closed;
      this.setState(newState);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { name, notStarted, inProgress, closed, role, loggedIn, userid } = this.state;
    let render = [];
    if (loggedIn) render.push(<div>
                                <CreateSection userid = {userid} fetchData = {this.fetchData} />
                                <PostSection changeStatus = {this.changeStatus} name={name} notStarted={notStarted} inProgress={inProgress} closed={closed} role={role} />
                              </div>);
    return (
      <div>
        <Signup
          onSignupSubmitHandler={this.onSignupSubmitHandler}
          onSignupNameChangedHandler={this.onSignupNameChangeHandler}
          onSignupChangedHandler={this.onSignupChangedHandler}
        />
        {render}
      </div>
    );
  }
}

export default App;