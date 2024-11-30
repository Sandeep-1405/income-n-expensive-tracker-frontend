import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import auth from "../firebase/firebase";
import { useNavigate } from "react-router";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { UserContext } from "../contex/contex";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {setUserEmail,setDisplayName} = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        localStorage.setItem('accessToken', res.user.accessToken);
        localStorage.setItem('displayName', res.user.displayName);
        localStorage.setItem('email', res.user?.email);
        setDisplayName(res.user?.displayName)
        setUserEmail(res.user?.email)
        console.log(res)
        navigate('/');
        //window.location.reload();
        
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/signup">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
