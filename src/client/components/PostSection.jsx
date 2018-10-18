import Post from './Post';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import PieChart from 'react-minimal-pie-chart';

const mapStateToProps = store => ({ 
  notStarted: store.infiniteReducer.notStarted,
  inProgress: store.infiniteReducer.inProgress,
  closed: store.infiniteReducer.closed,
  userid: store.infiniteReducer.user_id,
  role: store.infiniteReducer.role, 
  rerender: store.infiniteReducer.rerender, 
});
const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: (userid, status, postid, role) => {
      dispatch(actions.changeStatus(userid, status, postid, role))
    },   
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
      // borderTop: '6px solid rgb(85, 85, 85)',
      'margin-top': '20px',
     
      // 'margin-left': '20px',

      // backgroundColor: 'khaki'
    },
    postRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // height: '350px',
      // width: '100%',
      // borderTop: '3px solid rgb(85, 85, 85)',
      'padding-top': '10px',
      'padding-bottom': '10px',

      // 'margin-bottom': '10px',
      backgroundColor: 'tomato',
      // boxShadow: '3px 6px #888888'
    },
    postRow2: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // 'margin-bottom': '10px',
      'padding-top': '10px',
      'padding-bottom': '10px',
      // height: '350px',
      // width: '100%',
      // borderTop: '3px solid rgb(85, 85, 85)',
      backgroundColor: 'sandybrown',
      // boxShadow: '3px 6px #888888'
    },
    postRowClosed: {
      height: 'auto',
      width: '100%',
      'padding-top': '10px',
      'padding-bottom': '40px',
      // borderTop: '3px solid rgb(85, 85, 85)',
      backgroundColor: 'seagreen',
      // boxShadow: '3px 6px #888888'
    },
   
  }

  //iterate through each notStarted post and create component
  const notStartedComponents = props.notStarted.map((post, index) => {
    console.log(post, props,'post')
    return <Post
      key={index}
      // name={props.name}
      createdBy={post.student_name}
      resolvedBy=''
      userid={props.userid}
      role={props.role}
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
  const inProgressComponents = props.inProgress.map((post, index) => {
    return <Post
      key={index * 10000}
      // name={name}
      //role={role}
      userid={props.userid}
      createdBy={post.student_name}
      resolvedBy={post.helper_name}
      problem={post.problem}
      expect={post.expect}
      tried={post.tried}
      suspect={post.suspect}
      topic={post.topic}
      status={post.status}
      changeStatus={props.changeStatus}
      statusid = {post.statusid}
      postid = {post.post_id}
      role = {props.role}
      />
  });
  //iterate through each notStarted post and create component
  const closedComponents = props.closed.map((post, index) => {
    return <Post
      // key={index * 10000}
      // name={name}
      // role={role}
      createdBy={post.student_name}
      resolvedBy={post.helper_name}
      userid={props.userid}
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

  const length1 = notStartedComponents.length;
  const length2 = inProgressComponents.length;
  const length3 = closedComponents.length;
  // ** (CSS) class postRowClosed should be shorter than postRow**



  return (
    <div>
      <br></br>
      <br></br>

    <PieChart style={ style.pie }
    data={[
      { title: 'unclaimed', value: length1/(length1+length2+length3), color: 'tomato' },
      { title: 'in progress', value: length2/(length1+length2+length3), color: 'sandybrown' },
      { title: 'resolved', value: length3/(length1+length2+length3), color: 'seagreen' },
    ]}
    lineWidth={15}
    animate
    paddingAngle={4}
    // startAngle={270}
    ratio={0.9}
    
    />
      <div>unclaimed:{length1/(length1+length2+length3)*100}%</div>
      <div>in progress:{length2/(length1+length2+length3)*100}%</div>
      <div>resolved:{length3/(length1+length2+length3)*100}%</div>

      <div style={ style.postContainer }>
        <div style={ style.postRow }>
          { notStartedComponents }
        </div>
        <div style={ style.postRow2 }>
          { inProgressComponents }
        </div>
        <div style={ style.postRowClosed }> 
          { closedComponents }
        </div>
        
      </div>
    </div>
  )
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSection);
