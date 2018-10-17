import Post from './Post';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = store => ({ 
  notStarted: store.infiniteReducer.notStarted,
  inProgress: store.infiniteReducer.inProgress,
  closed: store.infiniteReducer.closed,
  userid: store.infiniteReducer.user_id,
  role: store.infiniteReducer.role, 
});
const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: (userid, status, postid) => {actions.changeStatus(userid, status, postid)},   
  };
};

const PostSection = (props) => {

  // // array of posts by status
  // const { notStarted, inProgress, closed } = props;
  // // handlers
  // const { changeStatus } = props; 
  // // user info
  // const { name, role } = props;

  // //css style for containers
  const style = {
    postContainer: {
      // display: 'flex',
      // height: '800px',
      // width: '100%',
      borderTop: '6px solid rgb(85, 85, 85)',
      backgroundColor: 'yellow'
    },
    postRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // height: '350px',
      // width: '100%',
      borderTop: '3px solid rgb(85, 85, 85)',
      backgroundColor: 'red',
      boxShadow: '3px 6px #888888'
    },
    postRowClosed: {
      height: '300px',
      width: '100%',
      borderTop: '3px solid rgb(85, 85, 85)',
      backgroundColor: 'green',
      boxShadow: '3px 6px #888888'
    }
  }

  //iterate through each notStarted post and create component
  const notStartedComponents = props.notStarted.map((post, index) => {
    console.log(post.post_id, post.status, props.userid,'post')
    return <Post
      key={index}
      // name={props.name}
      userid={props.userid}
      role={props.role}
      createdBy={post.createdby}
      resolvedBy={post.resolvedby}
      problem={post.problem}
      expect={post.expect}
      tried={post.tried}
      suspect={post.suspect}
      topic={post.topic}
      status={post.status}
      changeStatus={props.changeStatus}
      // statusid = {post.statusid}
      postid = {post.post_id}
      />
  });
  //iterate through each notStarted post and create component
  const inProgressComponents = props.inProgress.map((post, index) => {
    return <Post
      key={index * 10000}
      // name={name}
      //role={role}
      userid={props.userid}
      createdBy={post.createdby}
      resolvedBy={post.resolvedby}
      problem={post.problem}
      expect={post.expect}
      tried={post.tried}
      suspect={post.suspect}
      topic={post.topic}
      status={post.status}
      changeStatus={props.changeStatus}
      statusid = {post.statusid}
      postid = {post.post_id}
      />
  });
  //iterate through each notStarted post and create component
  const closedComponents = props.closed.map((post, index) => {
    return <Post
      // key={index * 10000}
      // name={name}
      // role={role}
      userid={props.userid}
      createdBy={post.createdby}
      resolvedBy={post.resolvedby}
      problem={post.problem}
      expect={post.expect}
      tried={post.tried}
      suspect={post.suspect}
      topic={post.topic}
      status={post.status}
      changeStatus={props.changeStatus}
      statusid = {post.statusid}
      postid = {post.post_id}
      />
  });


  // ** (CSS) class postRowClosed should be shorter than postRow**
  return (
    <div style={ style.postContainer }>
      <div style={ style.postRow }>
        { notStartedComponents }
      </div>
      <div style={ style.postRow }>
        { inProgressComponents }
      </div>
      <div style={ style.postRowClosed }> 
        { closedComponents }
      </div>
      
    </div>
  )
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSection);
