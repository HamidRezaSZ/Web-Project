import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../UserState';
import { baseUrl } from '../config';

function Login() {

  const closeButtonRef = useRef(null);

 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [result, setResult] = useState("");

 const userState = useSelector(state => state.user);
 const dispatch = useDispatch();

 const handleLogin = (event) => {
  event.preventDefault();
  if (!userState.isLoggedIn) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              'username': username,
              'password': password
          })
      };
      fetch(`${baseUrl}/api/users/login/`, requestOptions)
          .then(response => {
              if (!response.ok) {
                setResult('Unable to login');
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log(data);
              dispatch(login(data))
              if (closeButtonRef.current) {
                closeButtonRef.current.click();
            }
          })
          .catch(error => console.error('Error:', error));
  } else {
      setResult('you are already logged in');
  }
};


 return (
    <>
      <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#loginModal">
        Login
      </button>

      <div className="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="loginSentionModal">Login</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeButtonRef}></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="loginUsername" placeholder="Enter username" required onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="loginPassword" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
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

export default Login;
