import { useState } from "react";
import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userName, setUserName] = useState("");

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");

        setName("");
        setEmail("");
        setPassword("");

        setIsRegister(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Unable to connect to server");
    }
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");

        setUserName(data.user.name);
        setLoggedIn(true);

        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Unable to connect to server");
    }
  };

  // =========================
  // PROTOTYPE / DASHBOARD
  // =========================
  if (loggedIn) {
    return (
      <div className="prototype">

        <nav className="navbar">
          <h2>My Prototype</h2>

          <button
            onClick={() => {
              setLoggedIn(false);
              setIsRegister(false);
            }}
          >
            Logout
          </button>
        </nav>

        <div className="dashboard">

          <div className="welcome">
            <h1>Welcome, {userName}! 👋</h1>

            <p>
              You have successfully logged in to your application.
            </p>
          </div>

          <div className="cards">

            <div className="card">
              <h2>👤 Profile</h2>
              <p>View your profile information.</p>
              <button>View Profile</button>
            </div>

            <div className="card">
              <h2>📊 Dashboard</h2>
              <p>Manage your application data.</p>
              <button>Open Dashboard</button>
            </div>

            <div className="card">
              <h2>⚙️ Settings</h2>
              <p>Change your application settings.</p>
              <button>Settings</button>
            </div>

          </div>

          <div className="main-section">
            <h2>Application Prototype</h2>

            <p>
              This is your main prototype area. You can add your
              actual project features here.
            </p>

            <button className="main-button">
              Get Started
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================
  // LOGIN / REGISTER PAGE
  // =========================

  return (
    <div className="container">

      <div className="box">

        <h1>
          {isRegister ? "Register" : "Login"}
        </h1>

        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister ? (
          <button onClick={handleRegister}>
            Register
          </button>
        ) : (
          <button onClick={handleLogin}>
            Login
          </button>
        )}

        <p className="switch">

          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() => {
              setIsRegister(!isRegister);

              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            {isRegister ? " Login" : " Register"}
          </span>

        </p>

      </div>

    </div>
  );
}

export default App;