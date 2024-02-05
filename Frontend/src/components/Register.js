import React, { useState } from "react";
import { useSelector } from "react-redux";

function Register() {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [result, setResult] = useState("");

 const userState = useSelector(state => state.user);

 const handleLogin = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // Add your login logic here
    if (!userState.isLoggedIn) {
        setResult('registered');
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
                <form onSubmit={handleLogin}>
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
