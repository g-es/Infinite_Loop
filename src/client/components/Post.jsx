import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const Post = (props) => {
  //user info
  const { name, role} = props;
  //post info
  const { createdBy, resolvedBy, problem, expect, tried, suspect, topic, status, userid, helperid, studentid, statusid, postid} = props;
  //eventHandlers
  const { changeStatus } = props;
// console.log(props.status,props.user_id,props, 'in post.jsx')
  const style = {
    post: {
      margin: '5px',
      border: '1px solid black',
      display: 'inline-block',
      height: '350px',
      width: '250px',
      backgroundColor: 'beige',
      fontSize: '.7e'
    },
    pStyle: {
      margin: '0px',
      fontSize: '0.9em',
      height:'.5em',
      padding: '.3em 0.8em',

    },
    pStyle2: {
      margin: '0px',
      padding:'3px',
      fontSize: '1em',
      margin: '0.5em 0.3em',
    },
    h2Style: {
      fontSize: '1em',
      margin: '0.2em 0.6em',
      padding: '0.2em 0.2em',
    },
    buttonStyle: {
      'margin-top': '0.9em',
      'margin-left': '0.6em',
      padding: '0.5em 0.5em',
      'border-radius': '0.5em'
    },
    hover: {
      
    }
  }
  // console.log(props.topic,'topic')

  return(
    <div style = {style.post}>
      <div className='ledger'>
        <p style={style.pStyle2}>Created By: {createdBy}</p>
        <p style={style.pStyle2}>Claimed By: {resolvedBy}</p>
      </div>
      <h2 style={style.h2Style}>Problem:</h2>
        <p style={style.pStyle}>{problem}</p>
      <h2 style={style.h2Style}>Expect:</h2>
        <p style={style.pStyle}>{expect}</p>
      <h2 style={style.h2Style}>Tried:</h2>
        <p style={style.pStyle}>{tried}</p>
      <h2 style={style.h2Style}>Suspect:</h2>
        <p style={style.pStyle}>{suspect}</p>
      <h2 style={style.h2Style}>Topic:</h2>
      <p style={style.pStyle}>{topic}</p>

      <div className='footer'>
        {/* <div>topic</div> */}
        <button style={style.buttonStyle} className='statusButton' 
        onClick={() => {
          // console.log('from post', props.status, props.userid, props.postid)
          return changeStatus(props.userid, props.status, props.postid, props.role) } }> {status} </button>
      </div>
    </div>
  )
}
export default Post;