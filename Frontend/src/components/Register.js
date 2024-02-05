import React, { useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from '../config';

function Register() {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [result, setResult] = useState("");

 const userState = useSelector(state => state.user);

 const handleRegister = (event) => {
  event.preventDefault();
  if (!userState.isLoggedIn) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              'username': username,
              'password': password,
              'confirm_password': password,
              'first_name': 'first_name',
              'last_name': 'last_name',
              'phone_number': '0',
              'gender': '0',
              'address': 'address'
          })
      };
      fetch(`${baseUrl}/api/users/register/`, requestOptions)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          setResult('Unable to Register.');
        } else {
          setResult('Registration was successfull');
        }
        return response.json();
      })
      .then(data => {console.log(data)})
      .catch(error => console.error('Error:', error));
  } else {
      setResult('you are already logged in');
  }
};


 return (
    <>
      <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#registerModal">
        Resgister
      </button>

      <div className="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="registerSentionModal">Register</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="registerUsername" placeholder="Enter username" required onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="registerPassword" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Resgister</button>
                </form>
                <div>
                    {result}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
 );
}

export default Register;
