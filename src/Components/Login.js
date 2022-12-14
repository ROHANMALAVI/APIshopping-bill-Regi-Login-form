import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Login() {
  let navigate = useNavigate();
 
let [record, setRecord] = useState({
  email: "",
  password: ""

});

function handleChange(e) {
  e.preventDefault();
  setRecord({ ...record, [e.target.id]: e.target.value });
}

function onSubmit(){
  console.log(record);
  let users = [];
  if (localStorage.getItem("users") !== null) {
    users = JSON.parse(localStorage.getItem('users'));
  }
  let found = false;
  let user = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === record.email && users[i].password === record.password) {
      found = true;
      user = users[i];
      break;
    }
  }
  if (found) {
    localStorage.setItem("name", user.name);
    navigate("/dashbord");
  }
  else {
    alert(" something is invallid");
  }
}

  return (
    <div className='mt-5'>
      <h1>Login page</h1>
      <div className='row'>
        <div className='col-lg-6 mx-auto'>
      <form className='container mt-5'>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input type="email" id="email" className="form-control" onChange={(e) => { handleChange(e) }}/>
          <label className="form-label" for="form2Example1">Email address</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input type="password" id="password" className="form-control" onChange={(e) => { handleChange(e) }}/>
          <label className="form-label" for="form2Example2">Password</label>
        </div>
        {/* 
  <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label className="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            {/* <!-- Simple link --> */}

            <a href="#!">Forgot password?</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}
       <button type="button" onClick={(e)=>{onSubmit(e)}} className="btn btn-primary btn-block mb-4">Login</button>

        {/* <!-- Register buttons --> */}
        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default Login
