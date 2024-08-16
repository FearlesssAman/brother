import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        localStorage.setItem("useremail",credentials.email );
        localStorage.setItem("authtoken", json.authtoken);
        console.log("Auth token set in localStorage:", json.authtoken);
        navigate("/"); // Redirect to home or desired route after successful login
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  const onchange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control bg-white"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onchange}
            value={credentials.email}
            name="email"
            required
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control bg-white"
            id="exampleInputPassword1"
            name="password"
            onChange={onchange}
            value={credentials.password}
            required
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/createuser" className="m-3 btn btn-danger">I am a new User</Link>
      </form>
    </div>
  );
}
