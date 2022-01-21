import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      password2.length === 0
    ) {
      alert("Please fill in all requested fields.");
    } else if (password2 !== password) {
      alert("Passwords do not match.");
    } else {
      try {
        e.preventDefault();
        const response = await axios.post(
          "https://pascal-marvel-api.herokuapp.com/sign_up",
          {
            username: username,
            password: password,
            email: email,
          }
        );
        console.log(response.data);

        if (response.data.token) {
          onLogin(response.data.token, response.data.username);
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className="comics">
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              placeholder="ex: Peter Parker"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="ex: Spider-Man-I-Am@youdontknowme.gov"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              value={password2}
              placeholder="Confirm your password"
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
