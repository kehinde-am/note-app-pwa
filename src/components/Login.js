import React, { useState } from "react";
import { useAuth } from "../auth-context";
import { navigate } from "gatsby";

const Login = () => {
  const { login, signInWithGoogle, signInWithFacebook, signInAnonymously } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/app/notes");
    } catch (err) {
      setError("Failed to log in");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/app/notes");
    } catch (err) {
      setError("Failed to log in with Google");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      navigate("/app/notes");
    } catch (err) {
      setError("Failed to log in with Facebook");
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously();
      navigate("/app/notes");
    } catch (err) {
      setError("Failed to log in anonymously");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <button onClick={handleGoogleLogin}>Log In with Google</button>
      <button onClick={handleFacebookLogin}>Log In with Facebook</button>
      <button onClick={handleAnonymousLogin}>Log In Anonymously</button>
    </div>
  );
};

export default Login;
