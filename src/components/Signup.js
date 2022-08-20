import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
    let history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
      <form  onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            name
          </label>
          <div className="col-sm-10">
            <input onChange={onChange} name="name" type="text" className="form-control" id="name" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input onChange={onChange} name="email" type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              onChange={onChange}
              name="password"
              type="password"
              className="form-control"
              id="password"
              required
              minLength={5}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="cpassword" className="col-sm-2 col-form-label">
           Confirm Password
          </label>
          <div className="col-sm-10">
            <input
              onChange={onChange}
              name="cpassword"
              type="password"
              className="form-control"
              id="cpassword"
              required
              minLength={5}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Signup;
