import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Registration() {

  let [user, setUser] = useState({

    name: "",
    email: "",
    password: ""


    // product: [],

  });

  function handleChange(e) {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function Submit(e) {
    // localStorage.setItem("name", order.name);
    // localStorage.setItem("email", order.email);
    // localStorage.setItem("password", order.password);
    let users = [];
    if (localStorage.getItem("users") !== null)
      users = JSON.parse(localStorage.getItem("users"));

    let found = false;
    users.forEach(element => {
      if (element.email === user.email) {
        found = true;
      }
    });
    if (!found) {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }
    else {
      alert("Email already exists");
    }
  }

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px;" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example1c">Your Name</label>
                            <input name='name' value={user.name} type="text" id="form3Example1c" className="form-control" onChange={(e) => handleChange(e)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example3c">Your Email</label>
                            <input name='email' value={user.email} type="email" id="form3Example3c" className="form-control" onChange={(e) => { handleChange(e) }} />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example4c">Password</label>
                            <input name='password' value={user.password} type="password" id="form3Example4c" className="form-control" onChange={(e) => { handleChange(e) }} />
                          </div>
                        </div>

                        <div class="form-check d-flex justify-content-center mb-5">
                          <label className="form-check-label" for="form2Example3">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button onClick={(e) => { Submit(e) }} type="button" class="btn btn-primary btn-lg">Register</button>&nbsp;
                          <Link to={'/login'}> <button type="button" class="btn btn-primary btn-lg">Login</button></Link>
                        </div>



                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image"></img>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Registration
