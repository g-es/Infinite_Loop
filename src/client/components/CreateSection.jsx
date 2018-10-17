import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';


const mapStateToProps = store => ({ 
  user_id: store.infiniteReducer.user_id,
  problem: store.infiniteReducer.problem,
  expect: store.infiniteReducer.expect,
  tried: store.infiniteReducer.tried,
  suspect: store.infiniteReducer.suspect,
  topic: store.infiniteReducer.topic, 
});
const mapDispatchToProps = (dispatch) => {
  return {
    
    onProblem: (event) => {dispatch(actions.onProblem(event.target.value))},   
    onExpect: (event) => {dispatch(actions.onExpect(event.target.value))},
    onTried: (event) => {dispatch(actions.onTried(event.target.value))},
    onSuspect: (event) => {dispatch(actions.onSuspect(event.target.value))},
    onCreateSectionSubmit: (userid, problem, expect, tried, suspect,topic) => {dispatch(actions.onCreateSectionSubmit(userid, problem, expect, tried, suspect, topic))},
    onTopic: (event) => {dispatch(actions.onTopic(event.target.value))},
  };
};

const CreateSection = (props) => {
  
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
        <label>Problem: </label><input onChange = {props.onProblem} type="text" placeholder="" value={props.problem}/><br></br>
        <label>What did I expect to happen: </label><input onChange = {props.onExpect} type="text" placeholder="" value={props.expect}/><br></br>
        <label>What have I tried: </label><input onChange = {props.onTried} type="text" placeholder="" value={props.tried}/><br></br>
        <label>Why I suspect its not working: </label><input onChange = {props.onSuspect} type="text" placeholder="" value={props.suspect}/><br></br>
        <label>Topic: </label>

        {/* replace this part */}
        <select defaultValue="" onChange={props.onTopic}>
          <option value="" disabled>Select topic</option>
          <option value='AJAX'>AJAX</option>
          <option value='Algorithms / Javascript'>Algorithms / Javascript</option>
          <option value='Build Tools: Grunt / Gulp / Webpack / etc'>Build Tools: Grunt / Gulp / Webpack / etc</option>
          <option value='Cookies / Local Storage'>Cookies / Local Storage</option>
          <option value='CSS'>CSS</option>
          <option value='Data Structures'>Data Structures</option>
          <option value='Developer Tools'>Developer Tools</option>
          <option value='DOM Manipulation / jQuery'>DOM Manipulation / jQuery</option>
          <option value='Express'>Express</option>
          <option value='Git / GitHub'>Git / GitHub</option>
          <option value='HTML'>HTML</option>
          <option value='Node'>Node</option>
          <option value='Node Package Manager'>Node Package Manager</option>
          <option value='Non-Relational Databases / MongoDB / Mongoose'>Non-Relational Databases / MongoDB / Mongoose</option>
          <option value='O-Auth'>O-Auth</option>
          <option value='React'>React</option>
          <option value='Redux'>Redux</option>
          <option value='Relational Databases / SQL / Sequelize'>Relational Databases / SQL / Sequelize</option>
          <option value='Servers'>Servers</option>
          <option value='Testing'>Testing</option>
        </select>

        {/* <input onChange = {props.onTopic} type="text" placeholder="" value={props.topic}/> */}
        <br></br>
        <div >
          <button type="submit" onClick={() => 
            props.onCreateSectionSubmit(props.user_id,props.problem,props.expect,props.tried,props.suspect,props.topic)
            }>Submit</button>
        </div>
      </div>
    )
  }
 

export default connect(mapStateToProps, mapDispatchToProps)(CreateSection);
